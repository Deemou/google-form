import Layout from '@/components/layout';
import UserFormContent from '@/components/user-form-content';
import UserFormInfo from '@/components/user-form-info';

export default function Submit() {
  return (
    <Layout>
      <UserFormInfo isSubmit />
      <UserFormContent />
    </Layout>
  );
}
