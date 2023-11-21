import React, { useState, useEffect, useCallback } from 'react';
import { Table, Input, Button } from 'antd';
import authAxios from '../services/authAxios';
import Cookies from 'js-cookie';

const Products = () => {
    const [searchText, setSearchText] = useState('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [sortedInfo, setSortedInfo] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const queryParams = searchText ? `?search=${encodeURIComponent(searchText)}` : '';
            const response = await authAxios.get(`v1/product/${queryParams}`);
            if (Array.isArray(response.data?.data)) {
                const result = response.data.data.map((product) => ({
                    key: product?.id,
                    id: product?.id,
                    name: product?.name,
                    description: product?.description,
                    price: product?.price,
                    stock: product?.stock,
                }));
                setData(result);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        setLoading(false);
    }, [searchText]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const sendSelectedProducts = async () => {
        try {
            const res = await authAxios.post('v1/product/selection/', { product_ids: selectedRowKeys ? selectedRowKeys :[] });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const debounce = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func(...args), delay);
        };
    };

    const debouncedFetchData = debounce(fetchData, 1000);

    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setSearchText(selectedKeys[0]);
        debouncedFetchData();
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        debouncedFetchData();
    };

    const handleChange = (pagination, filters, sorter) => {
        setSortedInfo(sorter);
    };

    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
        Cookies.set('selectedProducts', JSON.stringify(selectedRowKeys));
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record) => ({
            disabled: false,
        }),
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // filters: [],
            filteredValue: sortedInfo.name || null,
            // onFilter: (value, record) => record.name.includes(value),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
    ];

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Input
                    placeholder="Search Products"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onPressEnter={debouncedFetchData}
                    style={{ width: 200, marginBottom: 10 }}
                />
                <Button type="primary" onClick={() => sendSelectedProducts()}>
                    Send Selected Products
                </Button>
            </div>
            <Table
                dataSource={data}
                columns={columns}
                rowSelection={rowSelection}
                onChange={handleChange}
                loading={loading}
            // rowKey="Id"
            />
        </div>
    );
};

export default Products;
