import * as React from 'react';
import { FormElement, Field } from '@progress/kendo-react-form';
import { Label, Error } from '@progress/kendo-react-labels';
import { TextArea } from '@progress/kendo-react-inputs';
import { DatePicker, DateTimePicker } from '@progress/kendo-react-dateinputs';
import { TitleEditor, TreatmentEditor, RoomEditor, TherapistEditor } from './editors';
export const CustomFormEditor = props => {
  return <FormElement horizontal={true}>
        <div className="k-form-field">
          <Label>
            Title
          </Label>
          <div className="k-form-field-wrap">
            <Field name={'Title'} component={TitleEditor} />
            {/* {props.errors.Patient && <Error>{props.errors.Patient}</Error>} */}
          </div>
        </div>
        
        <div className="k-form-field">
          <Label>
            Start
          </Label>
          <div className="k-form-field-wrap">
            <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}>
              <Field name={'Start'} component={props.startEditor || DatePicker} as={DateTimePicker} rows={1} width={'140px'} format="t" />
                        &nbsp;
              <Label>
                End
              </Label>
                        &nbsp;
              <Field name={'End'} component={props.endEditor || DatePicker} as={DateTimePicker} rows={1} width={'140px'} format="t" />
            </div>
          </div>
        </div>
        <div className="k-form-field">
          <Label>
            Description
          </Label>
          <div className="k-form-field-wrap">
            <Field name={'Note'} component={TextArea} rows={1} />
          </div>
        </div>
        <div className="k-form-field">
          <Label>
            Repeat
          </Label>
          <div className="k-form-field-wrap">
            <Field name={'Treatment'} component={TreatmentEditor} />
            {/* {props.errors.Treatment && <Error>{props.errors.Treatment}</Error>} */}
          </div>
        </div>
        
        <div className="k-form-field">
          <Label>
            Rooms
          </Label>
          <div className="k-form-field-wrap">
            <Field name="Room" component={RoomEditor} />
          </div>
        </div>
        <div className="k-form-field">
          <Label>
            Persons
          </Label>
          <div className="k-form-field-wrap">
            <Field name="Room" component={RoomEditor} />
          </div>
        </div>
      </FormElement>;
};