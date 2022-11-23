import {
  Datagrid,
  Edit,
  EditButton,
  List,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";

export const listPosts = (props) => {
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="brand" />
      <TextField source="price" />
      <EditButton basePath="/??" />
    </Datagrid>
  </List>;
};

export const editPost = (props) => {
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="brand" />
      <TextInput source="price" />
    </SimpleForm>
  </Edit>;
};
