/**
 * Created by Kip on 7/11/2019.
 */
Ext.define('Admin.view.premiseregistration.views.forms.PremisesInspectionRecommendationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premisesinspectionrecommendationfrm',
    controller: 'premiseregistrationvctr',
    frame: true,
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 0.5,
        labelAlign: 'top',
        margin: 4,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'record_id'
        },
        {
            xtype: 'datefield',
            name: 'actual_start_date',
            fieldLabel: 'Actual Start Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
            listeners: {
                change: function (field, newVal, oldVal) {
                    var form = field.up('form'),
                        end_date = form.down('datefield[name=actual_end_date]');
                    end_date.setMinValue(newVal);
                }
            }
        },
        {
            xtype: 'datefield',
            name: 'actual_end_date',
            fieldLabel: 'Actual End Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
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
                                table_name: 'par_premiseinspection_recommendations'
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
            xtype: 'combo',
            name: 'facility_type_id',
            fieldLabel: 'Facility Type',
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
                                table_name: 'par_facility_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textarea',
            name: 'remarks',
            fieldLabel: 'Remarks',
            allowBlank: true
        }
    ],
    buttons: [
        {
            text: 'Save Inspection Details & Recommendation',
            iconCls: 'x-fa fa-save',
            formBind: true,
            ui: 'soft-purple',
            handler: 'doSaveInspectionDetails',
            storeId: 'premisesinspectionprocessgridStr',
            action_url: 'premiseregistration/savePremiseInspectionRecommendation',
            table_name: 'tra_premiseinspection_applications',
        }
    ]
});