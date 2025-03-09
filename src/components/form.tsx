import SubmitButton from "@/components/form/submit-button";
import { InputField, TextAreaField } from "@/components/form/text-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from "@tanstack/react-form";
import { useEffect, useRef } from "react";
import { z } from "zod";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    InputField,
    TextAreaField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});

const defaultValues = {
  username: "",
  jobTitle: "",
  address: "",
  phone: "",
  email: "",
  summary: "",
  experience: [
    {
      jobTitle: "",
      company: "",
      summary: "",
      bullets: [""],
      startDate: "Jan 2024",
      endDate: "Jan 2025",
    },
  ],
  education: [
    {
      school: "",
      degree: "",
      startDate: "Jan 2024",
      endDate: "Jan 2025",
      summary: "",
    },
  ],
  skills: [""],
};

export type TFormData = typeof defaultValues;

const CVBuilder = () => {
  const form = useAppForm({
    defaultValues,
    validators: {
      // Pass a schema or function to validate
      onChange: z.object({
        username: z.string(),
        jobTitle: z.string(),
        address: z.string(),
        phone: z.string(),
        email: z.string(),
        summary: z.string(),
        experience: z.array(
          z.object({
            jobTitle: z.string(),
            company: z.string(),
            summary: z.string(),
            bullets: z.array(z.string()),
            startDate: z.string(),
            endDate: z.string(),
          }),
        ),
        education: z.array(
          z.object({
            school: z.string(),
            degree: z.string(),
            startDate: z.string(),
            endDate: z.string(),
            summary: z.string(),
          }),
        ),
        skills: z.array(z.string()),
      }),
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });

  const bulletsLength = useStore(form.store, (state) =>
    state.values.experience.reduce(
      (acc, experience) => acc + experience.bullets.length,
      0,
    ),
  );

  const lastInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (lastInputRef.current) {
      lastInputRef.current.focus();
    }
  }, [bulletsLength]);

  return (
    <form
      className='flex flex-col gap-4 font-sans px-24'
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className='flex flex-col items-center gap-1 self-center'>
        <form.AppField
          name='username'
          children={(field) => (
            <field.InputField
              variant='borderless'
              placeholder='Full Name'
              className='md:text-5xl max-w-xl self-center h-fit'
            />
          )}
        />
        <form.AppField
          name='jobTitle'
          children={(field) => (
            <field.InputField
              variant='borderless'
              className='md:text-2xl self-center h-fit'
              placeholder='Job Title'
            />
          )}
        />
      </div>

      <div className='border-y-2 border-section-border h-7 flex items-center flex-row justify-center gap-2'>
        <form.AppField
          name='address'
          children={(field) => (
            <field.InputField
              variant='borderless'
              placeholder='123 Your Street, Your City 550388'
            />
          )}
        />
        <form.AppField
          name='phone'
          children={(field) => (
            <field.InputField variant='borderless' placeholder='Phone' />
          )}
        />
        <form.AppField
          name='email'
          children={(field) => (
            <field.InputField variant='borderless' placeholder='Email' />
          )}
        />
      </div>

      <div className='flex flex-col gap-1 mb-2 border-b-2 border-section-border'>
        <Label className='text-muted-foreground self-center'>Summary</Label>
        <form.AppField
          name='summary'
          children={(field) => <field.TextAreaField variant='borderless' />}
        />
      </div>
      <div className='flex flex-col gap-1 mb-2 border-b-2 border-section-border'>
        <Label className='text-muted-foreground self-center'>Experience</Label>
        <form.Field name='experience' mode='array'>
          {(field) => {
            return (
              <div className='group py-2 flex flex-col gap-8'>
                {field.state.value.map((_, i) => {
                  return (
                    <div key={i} className='flex flex-col gap-2'>
                      {/* company and job title and start and end date */}
                      <div className='flex flex-row justify-between'>
                        {/* company and job title */}
                        <div className='flex flex-col gap-1'>
                          <form.AppField name={`experience[${i}].jobTitle`}>
                            {(field) => (
                              <field.InputField
                                className='h-5'
                                variant='borderless'
                                placeholder='Job Title'
                              />
                            )}
                          </form.AppField>
                          <form.AppField name={`experience[${i}].company`}>
                            {(field) => (
                              <field.InputField
                                className='h-5 text-muted-foreground'
                                variant='borderless'
                                placeholder='Company'
                              />
                            )}
                          </form.AppField>
                        </div>
                        <div className='flex flex-row justify-center h-fit items-center gap-2'>
                          <form.AppField
                            name={`experience[${i}].startDate`}
                            children={(field) => (
                              <field.InputField
                                className='h-5 text-sm '
                                placeholder='Start Date'
                                variant='borderless'
                              />
                            )}
                          />
                          <span className='text-muted-foreground'>-</span>
                          <form.AppField name={`experience[${i}].endDate`}>
                            {(field) => (
                              <field.InputField
                                className='h-5 text-sm'
                                placeholder='End Date'
                                variant='borderless'
                              />
                            )}
                          </form.AppField>
                        </div>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <form.AppField name={`experience[${i}].summary`}>
                          {(field) => (
                            <field.TextAreaField
                              variant='borderless'
                              placeholder='List out your responsibilities and achievements'
                            />
                          )}
                        </form.AppField>

                        <form.AppField
                          name={`experience[${i}].bullets`}
                          mode='array'
                        >
                          {(field) => (
                            <div className='flex flex-col'>
                              {field.state.value.map((_, i) => {
                                const isLastInput =
                                  i === field.state.value.length - 1;
                                return (
                                  <div
                                    key={i}
                                    className='flex flex-row items-center ml-6 before:content-["•"] before:text-muted-foreground before:mr-2 before:block before:mb-1'
                                  >
                                    <field.InputField
                                      className='h-5'
                                      ref={isLastInput ? lastInputRef : null}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          e.preventDefault();
                                          field.pushValue("");
                                        }
                                        if (
                                          e.key === "Backspace" &&
                                          field.state.value[i] === ""
                                        ) {
                                          field.removeValue(i);
                                        }
                                      }}
                                      key={i}
                                      variant='borderless'
                                      placeholder='Notable achievements'
                                      value={field.state.value[i]}
                                      onChange={(e) => {
                                        field.handleChange(
                                          field.state.value.map((_, index) => {
                                            if (index === i) {
                                              return e.target.value;
                                            }
                                            return _;
                                          }),
                                        );
                                      }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </form.AppField>
                      </div>
                    </div>
                  );
                })}
                <Button
                  className='self-start overflow-hidden group-hover:transition-all duration-75 ease-in-out absolute group-hover:relative group-hover:h-auto group-hover:opacity-100 group-hover:my-2 h-0 opacity-0 m-0'
                  onClick={() =>
                    field.pushValue({
                      jobTitle: "",
                      company: "",
                      summary: "",
                      bullets: [""],
                      startDate: "Jan 2024",
                      endDate: "Jan 2025",
                    })
                  }
                  type='button'
                >
                  Add Experience
                </Button>
              </div>
            );
          }}
        </form.Field>
      </div>
      <div className='flex flex-col gap-1 mb-2 border-b-2 border-section-border'>
        <Label className='text-muted-foreground self-center'>Education</Label>
        <form.Field name='education' mode='array'>
          {(field) => {
            return (
              <div className='group py-2 flex flex-col gap-8'>
                {field.state.value.map((_, i) => {
                  return (
                    <div key={i} className='flex flex-col gap-2'>
                      {/* company and job title and start and end date */}
                      <div className='flex flex-row justify-between'>
                        {/* company and job title */}
                        <div className='flex flex-col gap-1'>
                          <form.AppField name={`education[${i}].degree`}>
                            {(field) => (
                              <field.InputField
                                className='h-5'
                                variant='borderless'
                                placeholder='Degree'
                              />
                            )}
                          </form.AppField>
                          <form.AppField name={`education[${i}].school`}>
                            {(field) => (
                              <field.InputField
                                className='h-5 text-muted-foreground'
                                variant='borderless'
                                placeholder='School'
                              />
                            )}
                          </form.AppField>
                        </div>
                        <div className='flex flex-row justify-center h-fit items-center gap-2'>
                          <form.AppField
                            name={`education[${i}].startDate`}
                            children={(field) => (
                              <field.InputField
                                className='h-5 text-sm '
                                placeholder='Start Date'
                                variant='borderless'
                              />
                            )}
                          />
                          <span className='text-muted-foreground'>-</span>
                          <form.AppField name={`education[${i}].endDate`}>
                            {(field) => (
                              <field.InputField
                                className='h-5 text-sm'
                                placeholder='End Date'
                                variant='borderless'
                              />
                            )}
                          </form.AppField>
                        </div>
                      </div>
                      <div className='flex flex-col gap-1'>
                        <form.AppField name={`education[${i}].summary`}>
                          {(field) => (
                            <field.TextAreaField
                              variant='borderless'
                              placeholder='List out your responsibilities and achievements'
                            />
                          )}
                        </form.AppField>
                      </div>
                    </div>
                  );
                })}
                <Button
                  className='self-start overflow-hidden group-hover:transition-all duration-75 ease-in-out absolute group-hover:relative group-hover:h-auto group-hover:opacity-100 group-hover:my-2 h-0 opacity-0 m-0'
                  onClick={() =>
                    field.pushValue({
                      degree: "",
                      school: "",
                      summary: "",
                      startDate: "Jan 2024",
                      endDate: "Jan 2025",
                    })
                  }
                  type='button'
                >
                  Add Education
                </Button>
              </div>
            );
          }}
        </form.Field>
      </div>

      <div className='flex flex-col items-center gap-1 mb-2 border-b-2 border-section-border'>
        <Label className='text-muted-foreground self-center'>Skills</Label>
        <form.Field name='skills' mode='array'>
          {(parentField) => {
            return (
              <div className='flex flex-row gap-2 py-2'>
                {parentField.state.value.map((_, i) => {
                  return (
                    <div key={i}>
                      <form.AppField name={`skills[${i}]`}>
                        {(field) => (
                          <field.InputField
                            className='h-5'
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                parentField.pushValue("");
                              }
                              if (
                                e.key === "Backspace" &&
                                parentField.state.value[i] === ""
                              ) {
                                parentField.removeValue(i);
                              }
                            }}
                            variant='borderless'
                            placeholder='Skill'
                          />
                        )}
                      </form.AppField>
                    </div>
                  );
                })}
              </div>
            );
          }}
        </form.Field>
      </div>
      <form.AppForm>
        <form.SubmitButton />
      </form.AppForm>
    </form>
  );
};

export default CVBuilder;
