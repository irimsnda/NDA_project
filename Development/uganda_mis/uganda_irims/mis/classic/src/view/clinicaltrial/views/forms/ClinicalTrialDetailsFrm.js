/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'clinicaltrialdetailsfrm',
    layout: 'column',
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },autoScroll: true,
    scrollable: true,
    bodyPadding: 5,
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Study Title',
            name: 'study_title',
            columnWidth: 1
        },{
            xtype: 'textfield',
            fieldLabel: 'Title – short version',
            name: 'short_study_title',
          
        },{
            xtype: 'textfield',
            allowBlank:true,
            fieldLabel: 'Purpose of the Trial',
            name: 'purpose_of_trial',
          
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Background and Rationale (Brief)  ',
            columnWidth: 1,
            allowBlank:true,
            fieldLabel: 'Brief summary describing the background and objectives of trial',
            name: 'clinicaltrial_description'
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            allowBlank:true,
            displayField: 'name',
            fieldLabel: 'Clinical Study Phase',
            name: 'phase_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_phases'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
             allowBlank:true,
            fieldLabel: 'Clinical Funding Sources',
            name: 'clincialtrialfunding_source_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clincialtrialfunding_sources'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            allowBlank:true,
            fieldLabel: 'Clinical Trial Fields Types',
            name: 'clincialtrialfields_type_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clincialtrialfields_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        
        
        
        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            allowBlank:true,
            fieldLabel: 'Invetigational Product Type',
            name: 'clinical_prodsection_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_investigationalproduct_type'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'fieldcontainer',
            layout: 'column', columnWidth: 0.33,
           
            defaults: {
                labelAlign: 'top',
                columnWidth: 0.5,
            },
            items: [{
                xtype: 'textfield',
                allowBlank:true,
                fieldLabel: 'Identification Number ',
                name: 'clinicaltrial_identification_no'
            },{
                xtype: 'combo',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                allowBlank:true,
                displayField: 'name',
                fieldLabel: 'Trial Registry',
                name: 'clinicaltrial_registry_id',
                listeners: {
                    beforerender: {
                        fn: 'setClinicalTrialCombosStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_clinicaltrial_registries'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }]
        },{
            xtype: 'textfield',
            allowBlank:true,
            fieldLabel: 'Primary endpoints:', columnWidth: 1,
            name: 'primary_endpoints'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Secondary endpoints:', columnWidth: 1,
            name: 'secondary_endpoints'
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Protocol No',
            name: 'protocol_no'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Version No',
            name: 'version_no'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Date of Protocol',
            name: 'date_of_protocol',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            allowBlank:true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Study Start Date',
             allowBlank:true,
            name: 'study_start_date',
            submitFormat: 'Y-m-d',
            
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column', columnWidth: 0.33,
           
            defaults: {
                labelAlign: 'top',
                columnWidth: 0.5,
            },
            items: [{
                xtype: 'numberfield',
                 allowBlank:true,
                fieldLabel: 'Study Duration',
                name: 'study_duration',
                minValue: 1
            },
            {
                xtype: 'combo',
                name: 'duration_desc',
                allowBlank: false,
                 allowBlank:true,
                fieldLabel: 'Duration Description',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setClinicalTrialCombosStore',
                        config: {
                            pageSize: 1000,
                            proxy: {
                                extraParams: {
                                    model_name: 'DurationDescription'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            }]
        },
        {
            xtype: 'textarea',
             allowBlank:true,
            fieldLabel: 'Study Design',columnWidth: 1,
            name: 'trial_design'
        }, {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            allowBlank:true,
            fieldLabel: 'Is there previous Clinical trials with this (or similar) medicines in Uganda',
            name: 'is_clinicaltrialin_uganda',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'textarea',
            columnWidth: 0.5,
            allowBlank:true,
            fieldLabel:'If previous trials with this (or similar) medicines in Uganda, List the titles of previous trials with this (or similar) medicines in Uganda',
            name:'clinicalin_otheruganda_sites'
        },
        {
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Is Clinical Trial conducted in Other Coutries',
            name: 'is_clinicaltrialin_othercountry',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'textarea',
            columnWidth: 0.5,
            allowBlank:true,
            fieldLabel:'If the trial is conducted in the other countries, List the titles of previous trials with this (or similar) medicines in other countries'
        },

        {
            xtype: 'fieldcontainer',
            layout: 'column', columnWidth: 0.33,
           
            defaults: {
                labelAlign: 'top',
                columnWidth: 0.5,
            },
            items:[{
                xtype: 'textfield',
                fieldLabel: 'Ethical No{Clearance or Submission No)',
                name: 'clearance_no'
            },{
                xtype: 'combo',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                displayField: 'name',
                allowBlank: true,
                fieldLabel: 'Ethics Committee',
                emptyText:'Select Ethics Committee',
                name: 'ctrethics_committee_id',
                listeners: {
                    beforerender: {
                        fn: 'setClinicalTrialCombosStore',
                        config: {
                            pageSize: 100,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_ctrethics_committees'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
            
        }]
    }, {
        xtype: 'textarea',
        columnWidth: 1,
        allowBlank:true,
        fieldLabel: 'Primary objectives:',
        name: 'clinicaltrialprimary_objective'
    }, {
        xtype: 'textarea',
        allowBlank:true,
        fieldLabel: 'Secondary objectives:',columnWidth: 1,
        name: 'clinicaltrialsecondary_objective'
    },{
            xtype: 'textarea',
            fieldLabel: 'Inclusion criteria:',
            columnWidth: 1,
            allowBlank:true,
            name: 'inclusion_criteria'
        },{
            xtype: 'textarea',
            allowBlank:true,
            fieldLabel: 'Exclusion criteria:',
            columnWidth: 1,
            name: 'exclusion_criteria'
        }
    ]
});