import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText
} from '@ant-design/pro-components';
import { message } from 'antd';

import { addAdmin, editAdmin } from '../../../services/user';

import type { StateBool } from '../../../global/types';


interface IAdminAddEditProps {
  openAdminAddEdit: boolean
  setOpenAdminAddEdit: StateBool
  isEdit: boolean
  record: Record<string, any>
  reloadPage: () => void
}

export default function AdminAddEdit({
  openAdminAddEdit,
  setOpenAdminAddEdit,
  isEdit,
  record,
  reloadPage
}: IAdminAddEditProps) {
  return (
    <ModalForm
      width={isEdit ? 500 : 800}
      initialValues={record}
      title={`${isEdit ? '编辑' : '新增'}账号`}
      open={openAdminAddEdit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setOpenAdminAddEdit(false),
      }}
      onFinish={async (values) => {
        if (isEdit) {
          try {
            const res = await editAdmin({
              ...record,
              ...values
            });
            message.success(res.msg);
            reloadPage();
            setOpenAdminAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const res = await addAdmin(values);
            message.success(res.msg);
            reloadPage();
            setOpenAdminAddEdit(false);
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
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          rules={[{ message: '用户名必填', required: true }]}
        />
        {
          !isEdit && (
            <ProFormText.Password
              width="md"
              name="password"
              label="密码"
              placeholder="请输入密码"
              tooltip="密码切与生日姓名相关"
              rules={[{ message: '密码必填', required: true }]}
            />
          )
        }
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          width='sm'
          name="role"
          label="角色"
          rules={[{ message: '角色必选', required: true }]}
          options={[
            {
              label: '超级管理员',
              value: 1,
            },
            {
              label: '员工',
              value: 2
            }
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  )
}
