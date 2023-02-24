import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';

import { addCareworker, editCareworker } from '../../services/careworker';

import type { StateBool } from '../../global/types';
import { useEffect, useState } from 'react';

interface ICareworkerAddEditProps {
  openCareworkerAddEdit: boolean
  setOpenCareworkerAddEdit: StateBool
  isEdit: boolean
  record: Record<string, any>
  reloadPage: () => void
}

export default function CareworkerAddEdit({
  openCareworkerAddEdit,
  setOpenCareworkerAddEdit,
  isEdit,
  record,
  reloadPage
}: ICareworkerAddEditProps) {
  const [isHealthy, setIsHealthy] = useState(record.isHealthy);

  useEffect(() => {
    setIsHealthy(record.isHealthy);
  }, [record])
  return (
    <ModalForm
      initialValues={record}
      title={`${isEdit ? '编辑' : '新增'}护工`}
      open={openCareworkerAddEdit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setOpenCareworkerAddEdit(false),
      }}
      onFinish={async (values) => {
        if (isHealthy === 1) {
          values.careWorkerCases = '';
        }

        if (isEdit) {
          try {
            const res = await editCareworker({ id: record.id, ...values });
            message.success(res.msg);
            reloadPage();
            setOpenCareworkerAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const res = await addCareworker(values);
            message.success(res.msg);
            reloadPage();
            setOpenCareworkerAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        }
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="md"
          name="careWorkerName"
          label="护工姓名"
          placeholder="请输入护工姓名"
          rules={[{ message: '护工姓名必填', required: true }]}
        />
        <ProFormText
          width="md"
          name="careWorkerAge"
          label="护工年龄"
          placeholder="请输入护工年龄"
          rules={[{ message: '护工必填', required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          width="md"
          name="seniority"
          label="护工工龄"
          placeholder="请输入护工工龄"
          rules={[{ message: '护工工龄必填', required: true }]}
        />
        <ProFormDigit
          width="md"
          name="carWorkerPrice"
          label="护工费用"
          placeholder="请输入护工费用"
          rules={[{ message: '护工费用必填', required: true }]}
        />
      </ProForm.Group>
      <ProFormSelect
        width="md"
        name="isHealthy"
        label="是否健康"
        placeholder="请选择是否健康"
        rules={[{ message: '是否健康必填', required: true }]}
        options={[
          {
            value: 1,
            label: '健康'
          },
          {
            value: 0,
            label: '不健康'
          },
        ]}
        fieldProps={{
          onChange(val) {
            setIsHealthy(val);
          }
        }}
      />
      {
        isHealthy === 0 && (
          <ProFormText
            width="md"
            name="careWorkerCases"
            label="不健康病历"
            placeholder="请输入不健康病历"
            rules={[{ message: '不健康病历必填', required: true }]}
          />
        )
      }
    </ModalForm>
  )
}
