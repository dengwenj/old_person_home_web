import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';

import { getOldpersonByName } from '../../../services/user';
import { addCases, editCases } from '../../../services/healthy';

import type { StateBool } from '../../../global/types';
import { useEffect, useState } from 'react';

interface ICasesFileAddEditProps {
  openCasesFileAddEdit: boolean
  setOpenCasesFileAddEdit: StateBool
  isEdit: boolean
  record: Record<string, any>
  reloadPage: () => void
}

export default function CasesFileAddEdit({
  openCasesFileAddEdit,
  setOpenCasesFileAddEdit,
  isEdit,
  record,
  reloadPage
}: ICasesFileAddEditProps) {
  const [isTreat, setIsTreat] = useState(record.isTreat);

  useEffect(() => {
    setIsTreat(record.isTreat);
  }, [record])

  return (
    <ModalForm
      initialValues={record}
      title={`${isEdit ? '编辑' : '新增'}健康档案`}
      open={openCasesFileAddEdit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          setOpenCasesFileAddEdit(false);
          setIsTreat('0');
        },
      }}
      onFinish={async (values) => {
        values.oldPersonId = values.oldPersonName.value;
        delete values.oldPersonName

        if (isEdit) {
          try {
            const res = await editCases({ id: record.id, ...values });
            message.success(res.msg);
            reloadPage();
            setOpenCasesFileAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const res = await addCases(values);
            message.success(res.msg);
            reloadPage();
            setOpenCasesFileAddEdit(false);
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
        <ProFormText
          width='md'
          name="cases"
          label="病历"
          placeholder="请输入病历"
          rules={[{ message: '病历必填', required: true }]}
        />
        <ProFormDatePicker
          width='md'
          name="fallIllTime"
          label="患病时间"
          rules={[{ message: '患病时间必选', required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width="sm"
          name="isTreat"
          label="是否治疗"
          placeholder="请选择是否治疗"
          rules={[{ message: '是否治疗必填', required: true }]}
          options={[
            {
              value: "0",
              label: '未治疗'
            },
            {
              value: "1",
              label: '已治疗'
            },
          ]}
          fieldProps={{
            onChange(val) {
              setIsTreat(val);
            }
          }}
        />
      </ProForm.Group>
      {
        isTreat === "1" && (
          <ProForm.Group>
            <ProFormText
              width="sm"
              name="treatDrug"
              label="治疗药品"
              placeholder="请输入治疗药品"
              rules={[{ message: '治疗药品必填', required: true }]}
            />
            <ProFormText
              width="sm"
              name="treatHospital"
              label="治疗医院"
              placeholder="请输入治疗医院"
              rules={[{ message: '治疗医院必填', required: true }]}
            />
            <ProFormText
              width="sm"
              name="drugPrice"
              label="治疗费用(元)"
              placeholder="请输入治疗费用"
              rules={[{ message: '治疗费用必填', required: true }]}
            />
          </ProForm.Group>
        )
      }

    </ModalForm>
  )
}
