/**
 * Created by Kip on 7/11/2019.
 */
Ext.define('Admin.view.premiseregistration.views.forms.GcpInspectionRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'gcpinspectionrecommendationfrm',
    controller: 'clinicaltrialvctr',
    frame: true,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 0.33,
        labelAlign: 'top',
        margin: 4,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'record_id'
        },{
            xtype: 'hiddenfield',
            name: 'application_id'
        },{
            xtype: 'combo',
            name: 'study_status_id',
            fieldLabel: 'Study Status',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
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
        }, {
            xtype: 'combo',
            name: 'phase_id',
            fieldLabel: 'Clinical Trial Phase',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
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
            name: 'investigation_product_id',
            fieldLabel: 'Investigational product ',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_investigationproduct_sections'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'datefield',
                    name: 'actual_start_date',
                    fieldLabel: 'Actual Start Date',
                    submitFormat: 'Y-m-d',
                    format: 'd/m/Y',
                    columnWidth:0.48,
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
                    listeners: {
                        change: function (field, newVal, oldVal) {
                            var form = field.up('form'),
                                end_date = form.down('datefield[name=actual_end_date]');
                            end_date.setMinValue(newVal);
                        }
                    }
                },{
                    xtype: 'datefield',
                    name: 'actual_end_date',
                    fieldLabel: 'Inspection Actual End Date',
                    submitFormat: 'Y-m-d',
                    format: 'd/m/Y',
                    columnWidth:0.48,
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                },]
        },
        
        
        {
            xtype: 'combo',
            name: 'recommendation_id',
            fieldLabel: 'Recommendation',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gcpinspection_recommendations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            name: 'inspection_type_id',
            fieldLabel: 'Inspection Type',
            queryMode: 'local',
            forceSelection: true,
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_inspection_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'numberfield',
            name: 'target_sample_size',
            fieldLabel: 'Targeted sample size',
            allowBlank: true
        },{
            xtype: 'numberfield',
            name: 'number_of_participants',
            fieldLabel: 'Number of participants ',
            allowBlank: true
        }, {
            xtype: 'tagfield',
            name: 'study_sites_id',
            fieldLabel: 'Study Site',
            margin: '0 20 20 0',
            allowBlank: false,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Select Study Sites',
            growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setClinicalTrialCombosStore',
                    config: {
                        pageSize: 1000,
                        storeId:'clinicalStudySitesStr',
                        proxy: {
                            url: 'clinicaltrial/getClinicalStudySites'
                        }
                    },
                    isLoad: false
                }, afterrender: function () {
                    var form = this.up('form'),
                        application_id = form.down('hiddenfield[name=application_id]').getValue(),
                        store = this.getStore();
                    store.removeAll();
                    store.load({params: {application_id: application_id}});
                }
              
            }
        },
        {
            xtype: 'textarea',
            name: 'remarks',
            columnWidth: 1,
            fieldLabel: 'Remarks',
            allowBlank: true
        }
    ],
    buttons: [
        {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            handler: 'doSaveInspectionDetails',
            storeId: 'ctrgcpinspectionschedulegridstr',
            action_url: 'clinicaltrial/saveGcpInspectionRecommendation',
            table_name: 'tra_clinical_trial_applications',
        }
    ]
});