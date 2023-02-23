import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';

import { getOldpersonByName } from '../../../services/user';
import { addHealthy, editHealthy } from '../../../services/healthy';

import type { StateBool } from '../../../global/types';

interface IHealthyFileAddEditProps {
  openHealthyFileAddEdit: boolean
  setOpenHealthyFileAddEdit: StateBool
  isEdit: boolean
  record: Record<string, any>
  reloadPage: () => void
}

export default function HealthyFileAddEdit({
  openHealthyFileAddEdit,
  setOpenHealthyFileAddEdit,
  isEdit,
  record,
  reloadPage
}: IHealthyFileAddEditProps) {
  return (
    <ModalForm
      initialValues={record}
      title={`${isEdit ? '编辑' : '新增'}健康档案`}
      open={openHealthyFileAddEdit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setOpenHealthyFileAddEdit(false),
      }}
      onFinish={async (values) => {
        values.oldPersonId = values.oldPersonName.value;
        delete values.oldPersonName

        if (isEdit) {
          try {
            const res = await editHealthy({ id: record.id, ...values });
            message.success(res.msg);
            reloadPage();
            setOpenHealthyFileAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const res = await addHealthy(values);
            message.success(res.msg);
            reloadPage();
            setOpenHealthyFileAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        }
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormSelect.SearchSelect
          mode='single'
          width='sm'
          name="oldPersonName"
          label="姓名"
          placeholder="请搜索选择姓名"
          debounceTime={300}
          request={async ({ keyWords }) => {
            if (!keyWords) return []
            const res = await getOldpersonByName(keyWords);
            return res.data.map((item: any) => {
              return {
                value: item.id,
                label: item.oldPersonName
              }
            })
          }}
          rules={[{ message: '姓名必选', required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker
          width='sm'
          name="PETime"
          label="体检时间"
          rules={[{ message: '体检时间必选', required: true }]}
        />
        <ProFormText
          width="sm"
          name="height"
          label="身高(CM)"
          placeholder="请输入身高"
          rules={[{ message: '身高必填', required: true }]}
        />
        <ProFormText
          width="sm"
          name="weight"
          label="体重(KG)"
          placeholder="请输入体重"
          rules={[{ message: '体重必填', required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="heartRate"
          label="心率(60~100次/分)"
          placeholder="请输入心率"
          rules={[{ message: '心率必填', required: true }]}
        />
        <ProFormText
          width="sm"
          name="bloodOxygen"
          label="血氧(95%-100%)"
          placeholder="请输入血氧"
          rules={[{ message: '血氧必填', required: true }]}
        />
        <ProFormText
          width="sm"
          name="bloodPressure"
          label="血压(90-139mmHg)"
          placeholder="请输入血压"
          rules={[{ message: '血压必填', required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="sm"
          name="bloodType"
          label="血型"
          placeholder="请输入血型"
          rules={[{ message: '血型必填', required: true }]}
          options={[
            {
              value: 'A',
              label: 'A'
            },
            {
              value: 'B',
              label: 'B'
            },
            {
              value: 'O',
              label: 'O'
            },
            {
              value: 'AB',
              label: 'AB'
            },
          ]}
        />
        <ProFormSelect
          width="sm"
          name="isAllergy"
          label="是否过敏"
          placeholder="请选择是否过敏"
          rules={[{ message: '是否过敏必选', required: true }]}
          options={[
            {
              value: 0,
              label: '过敏'
            },
            {
              value: 1,
              label: '不过敏'
            },
          ]}
        />
        <ProFormSelect
          width="sm"
          name="isSmoke"
          label="是否吸烟"
          placeholder="请选择是否吸烟"
          rules={[{ message: '是否吸烟必选', required: true }]}
          options={[
            {
              value: 0,
              label: '不吸烟'
            },
            {
              value: 1,
              label: '吸烟'
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  )
}
