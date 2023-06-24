

/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.importexportpermits.views.sharedinterfaces.commoninterfaces.OnlineImpExportManagerSubmissionPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'onlineimpexportmanagersubmissionpnl',  
    permitsdetails_panel: 'previewimportexportpermitdetails',
    itemId: 'main_processpanel',
    controller: 'importexportpermitsvctr',
    viewModel: 'importexportpermitsvm',
    layout: 'fit',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        height: 40,
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
            }, {
                xtype: 'hiddenfield',
                name: 'application_status_id'
            }, {
                xtype: 'hiddenfield',
                name: 'status_type_id'
            }]
        }
    ],
    
  items: [{
    title: 'Applications',
    region: 'center',
    xtype: 'onlineimportexportpermitmanagersubgrid',
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: [
            {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                displayMsg: 'Showing {0} - {1} of {2} total records',
                emptyMsg: 'No Records',
                table_name: 'tra_importexport_applications',
                width: '70%',
                strict_mode: 0,
                doRefresh: function () {
                    var store = this.getStore();
                    store.removeAll();
                    store.load();
                },
                beforeLoad: function () {
                    var store = this.getStore(),
                        grid = this.up('grid'),
                        panel = grid.up('panel'),
                        process_id = panel.down('hiddenfield[name=process_id]').getValue(),
                        application_status_id = panel.down('hiddenfield[name=application_status_id]').getValue(),
                        section_id = panel.down('hiddenfield[name=section_id]').getValue(),
                        module_id = panel.down('hiddenfield[name=module_id]').getValue(),
                        sub_module_id = panel.down('hiddenfield[name=sub_module_id]').getValue(),
                        
                        has_registered_outlets = grid.down('combo[name=has_registered_outlets]').getValue();

                        store.getProxy().extraParams = {
                            section_id: section_id,
                            module_id: module_id,
                            application_status_id: application_status_id,
                            has_registered_outlets: has_registered_outlets,
                            sub_module_id: sub_module_id,
                            process_id: process_id
                        };
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
}]
});