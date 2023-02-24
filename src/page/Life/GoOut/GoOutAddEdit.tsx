import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';

import { getOldpersonByName } from '../../../services/user';
import { addGoOut, editGoOut } from '../../../services/lift';

import type { StateBool } from '../../../global/types';

interface IGoOutAddEditProps {
  openGoOutAddEdit: boolean
  setOpenGoOutAddEdit: StateBool
  isEdit: boolean
  record: Record<string, any>
  reloadPage: () => void
}

export default function GoOutAddEdit({
  openGoOutAddEdit,
  setOpenGoOutAddEdit,
  isEdit,
  record,
  reloadPage
}: IGoOutAddEditProps) {
  return (
    <ModalForm
      initialValues={record}
      title={`${isEdit ? '编辑' : '新增'}外出`}
      open={openGoOutAddEdit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setOpenGoOutAddEdit(false),
      }}
      onFinish={async (values) => {
        values.oldPersonId = values.oldPersonName.value;
        delete values.oldPersonName

        if (isEdit) {
          try {
            const res = await editGoOut({ id: record.id, ...values });
            message.success(res.msg);
            reloadPage();
            setOpenGoOutAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const res = await addGoOut(values);
            message.success(res.msg);
            reloadPage();
            setOpenGoOutAddEdit(false);
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
          width='md'
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
          width="md"
          name="goOutEvent"
          label="外出事件"
          placeholder="请输入外出事件"
          rules={[{ message: '外出事件必填', required: true }]}
        />
        <ProFormDatePicker
          width='md'
          name="goOutTime"
          label="外出时间"
          rules={[{ message: '外出时间必选', required: true }]}
        />
      </ProForm.Group>
      <ProFormTextArea
        width="md"
        name="goOutAddress"
        label="外出地址"
        placeholder="请输入外出地址"
        rules={[{ message: '外出地址必填', required: true }]}
      />
    </ModalForm>
  )
}
