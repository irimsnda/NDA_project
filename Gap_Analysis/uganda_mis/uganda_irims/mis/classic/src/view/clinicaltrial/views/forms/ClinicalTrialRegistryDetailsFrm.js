/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialRegistryDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'clinicaltrialregistrydetailsfrm',
    layout: 'column',
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    autoScroll: true,
    bodyPadding: 5,
    listeners: {
        afterrender: function () {
           
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly',
            value:1
        },
        {
            xtype: 'textarea',
            fieldLabel: 'Public Title',
            name: 'public_title',
            columnWidth: 0.5
        },{
            xtype: 'textarea',
            fieldLabel: 'Official Scientific Title',
            name: 'study_title',
            columnWidth: 0.5
        },{
            xtype: 'textarea',
            fieldLabel: 'Brief summary describing the background and objectives of trial',
            name: 'clinicaltrial_description',
            columnWidth: 1
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'What type of trial design is being implemented?',
            name: 'trial_design_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinicaltrial_designs'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Protocol No',
            name: 'protocol_no'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Version No',
            name: 'version_no'
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'What type of trial design is being implemented?',
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
        }, {
            xtype: 'textfield',
            fieldLabel: 'Acronym',
            name: 'acronym'
        },{
            xtype: 'tagfield',
            fieldLabel: 'Disease(s) or condition(s) being studied',
            columnWidth: 0.99,
            name: 'disease_being_studied',
            allowBlank: false,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Disease(s) or condition(s)',
            growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_diseaseconditions'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'textarea',
            fieldLabel: 'Other Obstetrics Disease or condition',
            name: 'other_obstetrics_disease',
            width:0.5
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Purpose of the Trial',
            name: 'purpose_of_trial',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_studypurposes'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Anticipated Trial Start Date',
            name: 'proposed_start_date',
            submitFormat: 'Y-m-d',
            format: 'Y-m-d',
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Actual Trial Start Date',
            name: 'actualtrial_start_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y', allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'datefield',
            fieldLabel: 'Anticipated Date of Last Follow up',
            name: 'anticipatedfollow_uplast_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y', allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'datefield',
            fieldLabel: 'Completion Date',
            name: 'completion_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y', allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Target No. of Participants',
            name: 'target_participants',
            minValue: 1
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Final No. Of Participants',
            name: 'final_participants',
           
            minValue: 1
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Recruitment Status',
            name: 'recruitment_status_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinical_recruitmentstatuses'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
       
        {
            xtype: 'textfield',
            fieldLabel: 'Publication Url',
            name: 'publication_url'
        }
    ]
});