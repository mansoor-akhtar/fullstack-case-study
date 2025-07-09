import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Formik } from "formik";
import {
  FormSelect,
  FormGroup,
  Button,
  FormLabel,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import {
  getNews,
  getCategories,
  getSources,
  getUserPreferences,
  saveUserPreferences,
} from "../../store/action";
import { capitaLize } from "../../util";

interface Category {
  id: string;
  name: string;
}

interface Source {
  id: string;
  name: string;
}

interface FormValues {
  category_id: string;
  source_id: string;
}

interface PreferenceProps {
  getNews: Function;
  getCategories: Function;
  getSources: Function;
  getUserPreferences: Function;
  saveUserPreferences: Function;
}

// === Initial form values ===
const initialValues: FormValues = {
  category_id: "",
  source_id: "",
};

const Preference: React.FC<PreferenceProps> = (props) => {
  const [formValues, setFormValues] = useState<FormValues | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    const { getCategories, getSources, getUserPreferences } = props;
    setLoading(true);

    getSources({
      onSuccess: (response: any) => {
        if (response.success) {
          setSources(response.data.sources);
        }
        setLoading(false);
      },
      onError: (error: any) => {
        console.log("error sources api", error);
      },
    });

    getCategories({
      onSuccess: (response: any) => {
        if (response.success) {
          setCategories(response.data.categories);
        }
        setLoading(false);
      },
      onError: (error: any) => {
        console.log("error categories api", error);
      },
    });

    getUserPreferences({
      onSuccess: (response: any) => {
        setFormValues({
          ...response.data.data,
        });
      },
      onError: (error: any) => {
        console.log("error preferences api", error);
      },
    });
  }, []);

  return (
    <div className="news-container">
      <Formik
        initialValues={formValues || initialValues}
        enableReinitialize
        onSubmit={(values) => {
          const { saveUserPreferences } = props;
          setLoading(true);

          saveUserPreferences({
            data: { ...values },
            onSuccess: () => {
              setLoading(false);
              setShowToast(true);
              setTimeout(() => {
                setShowToast(false);
              }, 3000);
            },
            onError: () => {
              setLoading(false);
            },
          });
        }}
      >
        {(formik) => {
          const { values, handleChange, handleSubmit } = formik;
          return (
            <form onSubmit={handleSubmit} method="POST">
              <h2 className="text-center">Preference Settings</h2>
              <ToastContainer position="top-end" className="p-3">
                <Toast show={showToast} onClose={() => setShowToast(false)} className="btn btn-success">
                  <Toast.Body>Preferences saved successfully!</Toast.Body>
                </Toast>
              </ToastContainer>

              <FormGroup className="mb-4">
                <FormLabel className="float-start mb-2">Source</FormLabel>
                <FormSelect
                  name="source_id"
                  value={values.source_id}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: "source_id",
                        value: e.target.value,
                      },
                    });
                  }}
                >
                  <option value="">Select Source</option>
                  {sources.map((source) => (
                    <option value={source.id} key={uuidv4()}>
                      {source.name}
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>

              <FormGroup className="mb-4">
                <FormLabel className="float-start mb-2">Category</FormLabel>
                <FormSelect
                  name="category_id"
                  value={values.category_id}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: "category_id",
                        value: e.target.value,
                      },
                    });
                  }}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option value={category.id} key={uuidv4()}>
                      {capitaLize(category.name)}
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <Button variant="primary" type="submit">
                  {loading && <span className="spinner-border spinner-border-sm" />} &nbsp;
                  Save
                </Button>
              </FormGroup>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getNews,
  getCategories,
  getSources,
  getUserPreferences,
  saveUserPreferences,
})(Preference);
