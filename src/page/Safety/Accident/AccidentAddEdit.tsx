import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';

import { addAccident, editAccident } from '../../../services/safety';

import type { StateBool } from '../../../global/types';

interface IAccidentAddEditProps {
  openAccidentAddEdit: boolean
  setOpenAccidentAddEdit: StateBool
  isEdit: boolean
  record: Record<string, any>
  reloadPage: () => void
}

export default function AccidentAddEdit({
  openAccidentAddEdit,
  setOpenAccidentAddEdit,
  isEdit,
  record,
  reloadPage
}: IAccidentAddEditProps) {
  return (
    <ModalForm
      initialValues={record}
      title={`${isEdit ? '编辑' : '新增'}事故`}
      open={openAccidentAddEdit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setOpenAccidentAddEdit(false),
      }}
      onFinish={async (values) => {
        if (isEdit) {
          try {
            const res = await editAccident({ id: record.id, ...values });
            message.success(res.msg);
            reloadPage();
            setOpenAccidentAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const res = await addAccident(values);
            message.success(res.msg);
            reloadPage();
            setOpenAccidentAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        }
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="accident"
          label="事故"
          placeholder="请输入事故"
          rules={[{ message: '事故必填', required: true }]}
        />
        <ProFormDatePicker
          width='sm'
          name="accidentTime"
          label="事故时间"
          rules={[{ message: '事故时间必选', required: true }]}
        />
        <ProFormDigit
          width="sm"
          name="loss"
          label="损失"
          placeholder="请输入损失(元)"
          rules={[{ message: '损失必填', required: true }]}
        />
      </ProForm.Group>
      <ProFormTextArea
        width="md"
        name="reason"
        label="事故原因"
        placeholder="请输入事故原因"
        rules={[{ message: '事故原因必填', required: true }]}
      />
    </ModalForm>
  )
}
