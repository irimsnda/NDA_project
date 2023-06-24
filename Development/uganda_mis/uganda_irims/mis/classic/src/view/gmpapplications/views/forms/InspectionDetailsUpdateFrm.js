/**
 * Created by Softclans on 4/2/2019.
 */
 Ext.define('Admin.view.gmpapplications.views.forms.InspectionDetailsUpdateFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'inspectiondetailsupdatefrm',
    controller: 'gmpapplicationsvctr',
    frame: true,
    layout: 'column',
    defaults:{
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
    },
    items: [ {
        xtype: 'hiddenfield',
        name: 'inspection_id'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    },
        {
            xtype: 'hiddenfield',
            name: 'id'
        },{
            xtype: 'combo',
            fieldLabel: 'Inspection Type',
            name: 'gmp_inspection_type_id',
            valueField: 'id',
            required: true,
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setGmpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gmp_inspection_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'assigned_gmpinspections'
        },
        {
            xtype: 'datefield',
            name: 'actual_start_date',
            fieldLabel: 'Actual Start Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },
        {
            xtype: 'datefield',
            name: 'actual_end_date',
            fieldLabel: 'Actual End Date',
            submitFormat: 'Y-m-d',
            format: 'd/m/Y',
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
        },{
            xtype: 'combo',
            fieldLabel: 'Inspection Recommendation',
            name: 'gmpinspection_recommendation_id',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                beforerender: {
                    fn: 'setGmpApplicationCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_gmpinspection_recommendation'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{

            xtype:'textarea',
            columnWidth: 1,
            name: 'gmpinspection_remarks', 
            fieldLabel: 'GMP Inspection Conclusions/Remarks'
        },{

            xtype: 'numberfield',
            fieldLabel: 'Renewal of the GMP Clearance (months)',
            name:'gmp_renewaltimeline',
            columnWidth: 0.5
        }
    ],
    buttons: [
        {
            text: 'Update Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'assigned_gmpinspections',
            storeID: 'inspectionscheduleselectionstr',
            action_url: 'gmpapplications/saveGmpApplicationCommonData',
            handler: 'doCreateGmpApplicationParamWin'
        }
    ]
});