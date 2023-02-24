import {
  ModalForm,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { message } from 'antd';

import { getOldpersonByName } from '../../../services/user';
import { addVisitors, editVisitors } from '../../../services/safety';

import type { StateBool } from '../../../global/types';

interface IVisitorsAddEditProps {
  openVisitorsAddEdit: boolean
  setOpenVisitorsAddEdit: StateBool
  isEdit: boolean
  record: Record<string, any>
  reloadPage: () => void
}

export default function VisitorsAddEdit({
  openVisitorsAddEdit,
  setOpenVisitorsAddEdit,
  isEdit,
  record,
  reloadPage
}: IVisitorsAddEditProps) {
  return (
    <ModalForm
      initialValues={record}
      title={`${isEdit ? '编辑' : '新增'}访客`}
      open={openVisitorsAddEdit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setOpenVisitorsAddEdit(false),
      }}
      onFinish={async (values) => {
        values.oldPersonId = values.oldPersonName.value;
        delete values.oldPersonName

        if (isEdit) {
          try {
            const res = await editVisitors({ id: record.id, ...values });
            message.success(res.msg);
            reloadPage();
            setOpenVisitorsAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const res = await addVisitors(values);
            message.success(res.msg);
            reloadPage();
            setOpenVisitorsAddEdit(false);
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
          label="老人姓名"
          placeholder="请搜索选择老人姓名"
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
          rules={[{ message: '老人姓名必选', required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="visitorsName"
          label="访客姓名"
          placeholder="请输入访客姓名"
          rules={[{ message: '访客姓名必填', required: true }]}
        />
        <ProFormDatePicker
          width='sm'
          name="accessTime"
          label="访问时间"
          rules={[{ message: '访问时间必选', required: true }]}
        />
        <ProFormDigit
          width="sm"
          name="visitorsPhone"
          label="访客电话"
          placeholder="请输入访客电话"
          rules={[{ message: '访客电话必填', required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="visitorsEvent"
          label="访客事件"
          placeholder="请输入访客事件"
          rules={[{ message: '访客事件必填', required: true }]}
        />
        <ProFormText
          width="sm"
          name="relation"
          label="与老人关系"
          placeholder="请输入与老人关系"
          rules={[{ message: '与老人关系必填', required: true }]}
        />
      </ProForm.Group>
    </ModalForm>
  )
}
