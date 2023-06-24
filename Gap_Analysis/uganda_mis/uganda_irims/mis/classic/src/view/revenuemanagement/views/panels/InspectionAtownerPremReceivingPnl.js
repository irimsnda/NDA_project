
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.panels.InspectionAtownerPremReceivingPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'inspectionatownerpremreceivingpnl',
    controller:'revenuemanagementvctr',
    layout: 'fit',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            ui: 'footer',
            height: 60,
            defaults: {
                labelAlign: 'top',
                margin: '-12 5 0 5',
                labelStyle: "color:#595959;font-size:13px"
            },
            items: ['->', {
                xtype: 'displayfield',
                name: 'process_name',
                fieldLabel: 'Process',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px'
                }
            }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'workflow_stage',
                    fieldLabel: 'Workflow Stage',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                }, {
                    xtype: 'displayfield',
                    name: 'impexport_permitno',
                    fieldLabel: 'Import/Export Permit No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                    },{
                    xtype: 'displayfield',
                    name: 'reference_no',
                    fieldLabel: 'Reference No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },{
                    xtype: 'displayfield',
                    name: 'tracking_no',
                    fieldLabel: 'Tracking No',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                },{
                    xtype: 'displayfield',
                    name: 'application_status',
                    fieldLabel: 'App Status',
                    fieldStyle: {
                        'color': 'green',
                        'font-weight': 'bold',
                        'font-size': '12px'
                    }
                }, {
                    xtype: 'tbseparator',
                    width: 20
                },{
                    xtype: 'hiddenfield',
                    name: 'process_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'workflow_stage_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'active_application_id'
                },  {
                    xtype: 'hiddenfield',
                    name: 'application_status_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'sub_module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'module_id'
                }, {
                    xtype: 'hiddenfield',
                    name: 'section_id'
                },  {
                    xtype: 'hiddenfield',
                    name: 'applicant_id'
                },{
                    xtype: 'hiddenfield',
                    name: 'active_application_code'
                }, {
                    xtype: 'hiddenfield',
                    name: 'permitapplication_code'
                }, {
                    xtype: 'hiddenfield',
                    name: 'invoice_no'
                }, {
                    xtype: 'hiddenfield',
                    name: 'invoice_id'
                }
            ]
        }
    ],
    tbar:[{
        xtype: 'combo',
        fieldLabel: 'Zone',
        labelWidth: 110,
        width: 400,
        name: 'zone_id',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'Zone'
                        }
                    }
                },
                isLoad: true
            }
        },
        labelStyle: 'font-weight:bold'
    },'->',{
        text: 'Search Import Permit',
        iconCls: 'fa fa-search',
        ui:'soft-green',
        handler: '',
        childXtype: 'revenueimportexportspermitgrid',
        winTitle:' Imports Permit Details',
        winWidth: '80%',
        handler:'funcSearchReveImportPermitDetails'
    },{
          text: 'Save Application',
          ui:'soft-purple',
            handler:'saveInspectionAtOwnersPremises',
            action_url: 'revenuemanagement/saveInspectionAtOwnersPremises',
            iconCls:'x-fa fa-save'
    }],
    bbar:['->', {
        text: 'Submit for Payment Processing',
        ui: 'soft-purple',
        iconCls: 'fa fa-check',
        name: 'process_submission_btn',
        storeID: '',
        table_name: '',
        winWidth: '50%'
    }],
    items: [
        {
            xtype: 'tabpanel',
            title: 'Bills/Invoicing',
            margin:5,
            layout: 'fit',
            listeners:{
                'tabchange':'funcOnInspectionAtOwnerTabchange'

            },
            items:[{
                    xtype: 'revenueapplicantdetailsfrm',
                    height: 300,
                    region: 'north',
                    title:'Applicant Details',
                    collapsible: true
            },{
                    xtype: 'premiinspimpextpermitsproductsgrid',
                    height: 300,
                    region: 'north',
                    title:'Permit Products Details',
                    collapsible: true
                
            },{
                    xtype: 'revenueinvoicingpnl',
                    title:'Invoicing Details',
                    itemId:'invoicing_panel',
                    region: 'center',
                    listeners:{
                        beforerender:function(panel){
                                panel.down('button[name=process_submission_btn]').setHidden(true);
                        }
                    }
            }],
        
        }
    ]
});