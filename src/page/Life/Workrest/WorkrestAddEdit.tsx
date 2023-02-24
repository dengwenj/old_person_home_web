import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';

import { addWorkrest, editWorkrest } from '../../../services/lift';

import type { StateBool } from '../../../global/types';

interface IWorkrestAddEditProps {
  openWorkrestAddEdit: boolean
  setOpenWorkrestAddEdit: StateBool
  isEdit: boolean
  record: Record<string, any>
  reloadPage: () => void
}

const rules = [{ message: '此项为必填', required: true }]

export default function WorkrestAddEdit({
  openWorkrestAddEdit,
  setOpenWorkrestAddEdit,
  isEdit,
  record,
  reloadPage
}: IWorkrestAddEditProps) {
  return (
    <ModalForm
      initialValues={record}
      title={`${isEdit ? '编辑' : '新增'}作息`}
      open={openWorkrestAddEdit}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setOpenWorkrestAddEdit(false),
      }}
      onFinish={async (values) => {
        if (isEdit) {
          try {
            const res = await editWorkrest({ id: record.id, ...values });
            message.success(res.msg);
            reloadPage();
            setOpenWorkrestAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const res = await addWorkrest(values);
            message.success(res.msg);
            reloadPage();
            setOpenWorkrestAddEdit(false);
          } catch (error) {
            console.log(error);
          }
        }
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormSelect
          width='sm'
          name="season"
          label="季节"
          placeholder="请选择季节"
          debounceTime={300}
          options={[
            {
              value: '1',
              label: '春季'
            },
            {
              value: '2',
              label: '夏季'
            },
            {
              value: '3',
              label: '秋季'
            },
            {
              value: '4',
              label: '冬季'
            },
          ]}
          rules={[{ message: '季节必选', required: true }]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width='sm'
          name="sevenEight"
          label="7-8点"
          rules={rules}
        />
        <ProFormText
          width="sm"
          name="eightNine"
          label="8-9点"
          rules={rules}
        />
        <ProFormText
          width="sm"
          name="nineTen"
          label="9-10点"
          rules={rules}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width='sm'
          name="tenEleven"
          label="10-11点"
          rules={rules}
        />
        <ProFormText
          width="sm"
          name="elevenTwelve"
          label="11-12点"
          rules={rules}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width="sm"
          name="twelveFourteen"
          label="12-14点"
          rules={rules}
        />
        <ProFormText
          width="sm"
          name="fourteenSeventeen"
          label="14-17点"
          rules={rules}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          width='sm'
          name="seventeenNineteen"
          label="17-19点"
          rules={rules}
        />
        <ProFormText
          width="sm"
          name="nineteenTwentyone"
          label="19-21点"
          rules={rules}
        />
        <ProFormText
          width="sm"
          name="twentyoneAfter"
          label="21点后"
          rules={rules}
        />
      </ProForm.Group>
      <ProFormTextArea
        width='xl'
        name="slogan"
        label="口号"
        rules={rules}
      />
    </ModalForm>
  )
}
