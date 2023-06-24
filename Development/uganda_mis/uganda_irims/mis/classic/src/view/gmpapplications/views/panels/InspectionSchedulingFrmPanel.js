
Ext.define('Admin.view.gmpapplications.views.panels.InspectionSchedulingFrmPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'inspectionschedulingfrmpanel',
    controller: 'gmpapplicationsvctr',
    title: 'Inspection Schedules',
    height: 555,
    items: [
        {
            xtype: 'gmpaddscheduleteamfrm'
        },
        {
            title: 'Inspectors',
            flex: 1,
            margin: 2,
            layout: 'fit',
            items: [
                {
                    xtype: 'grid',
                    height: 200,
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            ui: 'soft-green',
                            iconCls: 'x-fa fa-plus',
                            handler: 'showAddInspectionOtherDetails',
                            childXtype: 'gmpinspectorsfrm',
                            winTitle: 'Inspector',
                            winWidth: '30%'
                        }
                    ],
                    bbar: [
                        {
                            xtype: 'pagingtoolbar',
                            displayInfo: true,
                            beforeLoad: function () {
                                var store = this.store,
                                    grid = this.up('grid'),
                                    inspection_id = grid.up('panel').up('panel').down('form').down('hiddenfield[name=id]').getValue();
                                store.getProxy().extraParams = {
                                    inspection_id: inspection_id
                                };
                            }
                        }
                    ],
                    listeners: {
                        beforerender: {
                            fn: 'setGmpApplicationGridsStore',
                            config: {
                                pageSize: 10000,
                                storeId: 'gmpinspectorsstr',
                                proxy: {
                                    url: 'gmpapplications/getGmpScheduleInspectors'
                                }
                            },
                            isLoad: true
                        }
                    },
                    columns: [
                        {
                            text: 'Inspector',
                            flex: 1,
                            dataIndex: 'inspector_name'
                        },
                        {
                            text: 'Inspector',
                            flex: 1,
                            dataIndex: 'inspector_role'
                        },
                        {
                            text: 'Options',
                            xtype: 'widgetcolumn',
                            width: 90,
                            widget: {
                                width: 75,
                                textAlign: 'left',
                                xtype: 'splitbutton',
                                iconCls: 'x-fa fa-th-list',
                                ui: 'gray',
                                menu: {
                                    xtype: 'menu',
                                    items: [{
                                        text: 'Delete',
                                        iconCls: 'x-fa fa-trash',
                                        tooltip: 'Delete Record',
                                        table_name: 'gmp_inspectorsdetails',
                                        storeID: 'gmpinspectorsstr',
                                        action_url: 'gmpapplications/deleteGmpApplicationRecord',
                                        action: 'actual_delete',
                                        handler: 'doDeleteGmpApplicationWidgetParam',
                                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                                    }
                                    ]
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
