/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialsProgressRptDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'clinicaltrialsprogressrptdetailsfrm',
    layout: 'column',
    autoScroll: true,
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
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
            readOnly: true,
            columnWidth: 1
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
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
        },
        {
            xtype: 'textfield',readOnly: true,
            fieldLabel: 'Protocol No',
            name: 'protocol_no'
        },
        {
            xtype: 'textfield',readOnly: true,
            fieldLabel: 'Version No',
            name: 'version_no'
        },
        {
            xtype: 'datefield',
            fieldLabel: 'Date of Protocol',
            name: 'date_of_protocol',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',readOnly: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            fieldLabel: 'Clinical Study Reporting Type',
            name: 'clinicalreport_type_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinicalreport_type'
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
            fieldLabel: 'Clinical Study Status',
            name: 'clinicalstudy_status_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_clinicalstudy_statuses'
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
            fieldLabel: 'Clinical Study Site',
            name: 'study_site_id',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'clinicaltrial/getclinicalStudySitesData',
                            extraParams: {
                                table_name: 'study_sites'
                            }
                        }
                    },
                    isLoad: false
                },
                afterrender:function(cbo){
                        var store = cbo.getStore(),
                            frm = cbo.up('form');
                            application_code =0;
                            if(frm.up('ctrprogressreportappmoredetailswizard')){
                               
                                application_code = frm.up('ctrprogressreportappmoredetailswizard').down('hiddenfield[name=active_application_code]').getValue();
                            }
                            else if(frm.up('clinicaltrialprogressrptonlinepreviewpnl')){
                                application_code = frm.up('clinicaltrialprogressrptonlinepreviewpnl').down('hiddenfield[name=application_code]').getValue();
                            }
                           
                            store.removeAll();
                            store.load({params:{application_code:application_code}});

                }
            }
        },{
            xtype: 'datefield',
            fieldLabel: 'Reporting Period Start Date',
            name: 'reporting_start_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'datefield',
            fieldLabel: 'Reporting Period End Date',
            name: 'reporting_end_date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Screened Participants(#)',
            name: 'screen_participants',
           
            minValue: 1
        },{
            xtype: 'datefield',
            fieldLabel: 'Date Of First Screening',
            name: 'dateof_first_screening',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Target Participants',
            name: 'target_sample_size',
            minValue: 1
        },{
            xtype: 'numberfield',
            fieldLabel: 'Enrolled Participants',
            name: 'enrolled_participants',
            minValue: 1
        },{
            xtype: 'datefield',
            fieldLabel: 'Date Of First Enrollment',
            name: 'dateof_first_enrollment',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'numberfield',
            fieldLabel: 'Number of Withdrawals /Dropouts',
            name: 'number_of_dropouts',
            minValue: 1
        },
        {
            xtype: 'numberfield',
            fieldLabel: 'Number lost to follow up',
            name: 'number_lost_tofollow_ups',
            minValue: 1
        },
        {
            xtype: 'textarea',columnWidth: 1,
            fieldLabel: 'Inclusion Criteria',
            name: 'inclusion_criteria',            

        },
        {
            xtype: 'textarea',columnWidth: 1,
            fieldLabel: 'Exclusion Criteria',
            name: 'exclusion_criteria',            

        },{
            xtype:'numberfield',
            fieldLabel: 'Number of SAEs /SUSARs that have occurred',
            name: 'number_of_saes',            

        },{
            xtype:'numberfield',
            fieldLabel: 'Number of Events of medical importance that have occurred',
            name: 'events_of_medialimportance',            

        },{
            xtype:'numberfield',
            fieldLabel: 'Number of protocol deviations that have occurred',
            name: 'protocol_deviations',            

        }
    ]
});