/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.common_panels.NewProductApprovalPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'newProductApprovalPnl',
    layout: 'fit',
    layout: 'border',
    defaults: {
        split: true,
    },
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
            name: 'application_status',
            hidden: true,
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
            xtype: 'displayfield',
            name: 'tracking_no',hidden: true,
            fieldLabel: 'Tracking No',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
            }
        },  {
            xtype: 'displayfield',
            name: 'reference_no',
            hidden: true,
            fieldLabel: 'Ref No',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
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

    items: [
        {
            title: 'Meeting Details',
            region: 'north',
            height: 110,
            xtype: 'productMeetingDetailsFrm'
        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'productApprovalTCMeetingGrid',
            dockedItems: [{
                xtype: 'toolbar',
                ui: 'footer',
                scrollable: true,
                dock: 'bottom',
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        displayInfo: true,
                        displayMsg: 'Showing {0} - {1} of {2} total records',
                        emptyMsg: 'No Records',
                        table_name: 'tra_product_applications',
                        width: '60%',
                        strict_mode: 0,
                        doRefresh: function () {
                            var store = this.getStore();
                            store.removeAll();
                            store.load();
                        },
                        beforeLoad: function () {
                            this.up('grid').fireEvent('refresh', this);
                        }
                    }, '->', {
                        xtype: 'button',
                        text: 'Export Meeting Details',
                        iconCls: 'x-fa fa-save',
                        ui: 'soft-purple',
                        name: 'save_btn',
                        table_name: 'tra_product_applications',
                        handler: 'exportMeetingDetails',
                        toaster: 1
                    }, {
                        xtype: 'button',
                        text: 'Upload Meeting Documents',
                        iconCls: 'x-fa fa-upload',
                        ui: 'soft-purple',
                        name: 'save_btn',
                        reference_table_name: 'tc_meeting_details',
                        table_name: 'tc_meeting_uploaddocuments',
                        handler: 'funcUploadTCMeetingtechnicalDocuments',
                        document_type_id: 4,
                        childXtype:'unstructureddocumentuploadsgrid',
                        winTitle: 'Technical Meeting Documents Upload',
                        winWidth: '80%',
                        toaster: 0
                    }, {
                        xtype: 'button',
                        text: 'Submit Application(s)',
                        iconCls: 'x-fa fa-check',
                        ui: 'soft-purple',
                        name: 'submit_selected',
                        gridXtype:'productApprovalTCMeetingGrid',
                        table_name: 'tra_product_applications',
                        action: 'process_submission_btn',
                        winWidth: '50%',
                        toaster: 0
                    }
                ]
            }],
        },
        {
            xtype: 'panel',
            layout:'accordion', region: 'west',
            width: 400,collapsed: true,
            collapsible: true,
            titleCollapse: true,
            title:'Meeting Participants & Agendas',
            items:[{
                title: 'Participants',
                xtype: 'productTcMeetingParticipantsGrid',
                
                listeners: {
                    afterrender: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    }
                },
                tbar: [
                    {
                        xtype: 'hiddenfield',
                        name: 'isReadOnly'
                    },
                    {
                        xtype: 'button',
                        text: 'Add',
                        name: 'add_participant',
                        iconCls: 'x-fa fa-plus',
                        ui: 'soft-green',
                        handler: 'showAddTcMeetingParticipants',
                        childXtype: 'parmeetingparticipantsgrid',
                        winTitle: 'Meeting Participants',
                        winWidth: '50%',
                        stores: '[]'
                    }
                ],
            },{
                xtype: 'panel',
                title:'Agendas'
            }]

        }
    ]
});