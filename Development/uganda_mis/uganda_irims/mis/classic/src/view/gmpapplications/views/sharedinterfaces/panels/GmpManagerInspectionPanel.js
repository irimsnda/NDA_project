/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagerInspectionPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpmanagerinspectionpanel',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Inspection Schedule Details',
            region: 'north',
            height: 230,
            xtype: 'gmpinspectionscheduleteamfrm',
            collapsible: true
        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'gmpmanagerinspectiongrid'
        },
        {
            title: 'Inspectors',
            region: 'west',
            width: 400,
            collapsible: true,
            titleCollapse: true,
            layout: 'fit',
            items:[
                {
                    xtype: 'grid',
                    name: 'inspectorsGrid',
                    tbar: [
                        {
                            xtype: 'button',
                            text: 'Add',
                            ui: 'soft-green',
                            iconCls: 'x-fa fa-plus',
                            //handler: 'showAddInspectionOtherDetails',
                            childXtype: 'gmpinspectorsfrm',
                            winTitle: 'Inspector Details',
                            name: 'add_btn',
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
                                    inspection_id = grid.up('newgmpmanagerinspectionpanel').down('form').down('hiddenfield[name=id]').getValue();
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
                            isLoad: false
                        }
                    },
                    columns: [
                        {
                            text: 'Inspector',
                            flex: 1,
                            dataIndex: 'inspector_name'
                        },
                        {
                            text: 'Role',
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
                                        text: 'Edit',
                                        iconCls: 'x-fa fa-edit',
                                        tooltip: 'Edit Record',
                                        action: 'edit',
                                        handler: 'showEditGmpApplicationWinFrm',
                                        childXtype: 'gmpinspectorsfrm',
                                        winTitle: 'Inspector Details',
                                        winWidth: '30%',
                                        stores: '[]'
                                    },{
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
