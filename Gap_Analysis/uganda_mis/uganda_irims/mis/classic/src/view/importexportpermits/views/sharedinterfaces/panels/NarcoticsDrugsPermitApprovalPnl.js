/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.panels.NarcoticsDrugsPermitApprovalPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Controller Drugs Permit Permit Review',
    xtype: 'narcoticsdrugspermitapprovalpnl',
    layout: 'fit',
    permitsdetails_panel: 'previewnarcoticspermitdetails',
    itemId: 'main_processpanel',
    layout: 'border',
    defaults: {
        split: true,
    },
    //
    dockedItems: [{
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
                    'font-size': '12px',  'margin-top': '-2px'
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
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            }, {
                xtype: 'displayfield',
                name: 'application_status',
                hidden: true,
                fieldLabel: 'App Status',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                xtype: 'tbseparator',
                width: 20
            },{
                xtype: 'displayfield',
                name: 'tracking_no',
                hidden: true,
                fieldLabel: 'Tracking No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            },  {
                xtype: 'displayfield',
                name: 'reference_no',
                hidden: true,
                fieldLabel: 'Ref No',
                fieldStyle: {
                    'color': 'green',
                    'font-weight': 'bold',
                    'font-size': '12px',  'margin-top': '-2px'
                }
            }, {
                xtype: 'hiddenfield',
                name: 'process_id'
            }, {
                xtype: 'hiddenfield',
                name: 'workflow_stage_id'
            }, {
                xtype: 'hiddenfield',
                name: 'active_application_id'
            },{
                xtype: 'hiddenfield',
                name: 'active_application_code'
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            },{
                xtype: 'hiddenfield',
                name: 'module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'sub_module_id'
            }, {
                xtype: 'hiddenfield',
                name: 'section_id'
            }
            ]
        }
    ],

    items: [{
            title: 'Applications',
            region: 'center',
            xtype: 'narcoticsdrugspermitapprovalgrid',//importexportpermitmanagerreviewgrid
            isReadOnly: true,
            tbar:[{
                xtype: 'combo',
                queryMode: 'local',
                forceSelection: true,
                valueField: 'id',
                displayField: 'name',
                width: 300,
                fieldLabel:'Application Decision(s)',
                labelWidth: 108,
                name: 'decision_id',
                store: 'productApprovalDecisionsStr',
                listeners: {
                    change: function (cmb, newVal) {
                            var grid = cmb.up('grid'),
                                store = grid.store;
                                store.removeAll();
                                store.load({params : {decision_id:newVal}});

                    },
                    afterrender:function(cbo){
                        cbo.store.load();

                    }
                }
            },{
                xtype: 'displayfield',
                value: 'Select Applications Decision Before Submission ',
                fieldStyle: {
                    'color': 'red',
                    'font-weight': 'bold',
                    'font-size': '14',  'margin-top': '-2px'
                }
                
            },],
            dockedItems: [{
                xtype: 'toolbar',
                ui: 'footer',
                dock: 'bottom',
                items: [ {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        displayMsg: 'Showing {0} - {1} of {2} total records',
                        emptyMsg: 'No Records',
                        table_name: 'tra_importexport_applications',
                        width: '90%',
                        strict_mode: 0,
                        doRefresh: function () {
                            var store = this.getStore();
                            store.removeAll();
                            store.load();
                        },
                        beforeLoad: function () {
                            this.up('grid').fireEvent('refresh', this);
                        }
                    },{
                        xtype: 'button',
                        text: 'Submit Application(s)',
                        iconCls: 'x-fa fa-check',
                        ui: 'soft-purple',
                        name: 'submit_selected',
                        table_name: 'tra_importexport_applications',
                        action: 'process_submission_btn',
                        winWidth: '50%',
                        toaster: 0
                    }
                ]
            }],
        }
    ]
});