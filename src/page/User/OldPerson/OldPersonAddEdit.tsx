import { ModalForm, ProForm, ProFormDatePicker, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';

import { addOldPerson, editOldPerson } from '../../../services/user';

import type { StateBool } from '../../../global/types';

interface IOldPersonAddEditProps {
  openOldPersonAddEdit: boolean
  setOpenOldPersonAddEdit: StateBool
  isEdit: boolean
  record: Record<string, any>
  reloadPage: () => void
}

export default function OldPersonAddEdit({
  openOldPersonAddEdit,
  setOpenOldPersonAddEdit,
  isEdit,
  record,
  reloadPage
}: IOldPersonAddEditProps) {
  return (
    <ModalForm
      initialValues={record}
      title={`${isEdit ? '编辑' : '新增'}人员`}
      open={openOldPersonAddEdit}
      modalProps={{
        centered: true,
        destroyOnClose: true,
        onCancel: () => setOpenOldPersonAddEdit(false),
      }}
      onFinish={async (values) => {
        if (isEdit) {
          try {
            const res = await editOldPerson({
              ...record,
              ...values
            });
            message.success(res.msg);
            reloadPage();
            setOpenOldPersonAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const res = await addOldPerson(values);
            message.success(res.msg);
            reloadPage();
            setOpenOldPersonAddEdit(false);
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
          name="oldPersonName"
          label="姓名"
          placeholder="请输入姓名"
          rules={[{ message: '姓名必填', required: true }]}
        />
        <ProFormText
          width="md"
          name="phone"
          label="电话号码"
          placeholder="请输入电话号码"
          rules={[{ message: '电话号码必填', required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width='sm'
          name="gender"
          label="性别"
          rules={[{ message: '性别必选', required: true }]}
          options={[
            {
              label: '男',
              value: 1,
            },
            {
              label: '女',
              value: 0
            }
          ]}
        />
        <ProFormDatePicker
          width='sm'
          name="birthDate"
          label="出生日期"
          rules={[{ message: '出生日期必选', required: true }]}
        />
        <ProFormSelect
          width='sm'
          name="isSpouse"
          label="配偶"
          rules={[{ message: '配偶必选', required: true }]}
          options={[
            {
              value: 1,
              label: '在世'
            },
            {
              value: 2,
              label: '已故'
            },
            {
              value: 3,
              label: '未婚'
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="familyMember"
          label="家属姓名"
          placeholder="请输入家属姓名"
          rules={[{ message: '家属姓名必填', required: true }]}
        />
        <ProFormText
          width="sm"
          name="familyMemberPhone"
          label="家属电话"
          placeholder="请输入家属电话"
          rules={[{ message: '家属电话必填', required: true }]}
        />
        <ProFormText
          width="sm"
          name="relation"
          label="关系"
          placeholder="请输入和老人关系"
          rules={[{ message: '关系必填', required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          width="md"
          name="address"
          label="老人住址"
          placeholder="请输入老人住址"
          rules={[{ message: '老人住址必填', required: true }]}
        />
      </ProForm.Group>
      <ProFormText
        width="md"
        name="familyMemberJob"
        label="家属工作"
        placeholder="请输入家属工作"
      />
      <ProFormTextArea
        width="md"
        name="familyMemberAddress"
        label="家属住址"
        placeholder="请输入家属住址"
      />
    </ModalForm>
  )
}
