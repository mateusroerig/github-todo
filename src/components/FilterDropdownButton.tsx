import React, { useState } from 'react';
import { Button, Dropdown, Menu, Form, Input, DatePicker, message, Select } from 'antd';
import { DownOutlined } from '@ant-design/icons';

type FilterDropdownButtonProps = {
  applyFiltering: (filters: FilterValues) => void;
};

export interface FilterValues {
  title?: string;
  description?: string;
  date?: Date;
  completed?: 'true' | 'false' | 'both';
  [key: string]: string | Date | undefined;
}

const FilterDropdownButton = ({ applyFiltering }: FilterDropdownButtonProps) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handleVisibleChange = (flag: boolean) => {
    setVisible(flag);
  };

  const onFinish = (values: FilterValues) => {
    applyFiltering(values);
    setVisible(false);
    
    const isFiltered = Object.keys(values).some(key => 
      (key !== 'completed' || values[key] !== 'both') && values[key] !== undefined
    );
    setFiltersApplied(isFiltered);
  };

  const menu = (
    <Menu>
      <Menu.Item key="form" style={{ padding: '10px', width: '300px' }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Título" style={{ marginBottom: 8 }}>
            <Input placeholder="Filtrar por nome" />
          </Form.Item>

          <Form.Item name="description" label="Descrição" style={{ marginBottom: 8 }}>
            <Input placeholder="Filtrar por descrição" />
          </Form.Item>

          <Form.Item name="date" label="Data" style={{ marginBottom: 8 }}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name="completed" label="Conclusão"  initialValue="both" style={{ marginBottom: 8 }}>
            <Select placeholder="Filter por status de conclusão">
              <Select.Option value="true">Concluído</Select.Option>
              <Select.Option value="false">Não concluído</Select.Option>
              <Select.Option value="both">Todos</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: '16px', marginTop: '16px' }}>
            <Button type="primary" htmlType="submit">
              Filtrar
            </Button>
          </Form.Item>
        </Form>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={handleVisibleChange}
      visible={visible}
      trigger={['click']}
    >
      <Button>
        Filtrar
        {filtersApplied && <span className='filter-applied-circle' />}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default FilterDropdownButton;