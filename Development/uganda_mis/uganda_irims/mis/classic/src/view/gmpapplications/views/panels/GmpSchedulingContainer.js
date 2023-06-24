/**
 * Created by Kip on 1/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.GmpSchedulingContainer', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpschedulingcontainer',
    margin: 2,
    layout: {
        type: 'border'
    },
    defaults: {
        split: true
    },
    items: [
        {
            title: 'Team Details',
            region: 'center',
            xtype: 'gmpscheduleteamfrm'
        },
        {
            title: 'Assigned GMP Inspections',
            region: 'east',
            width: 700,
            xtype: 'assignedgmpinspectionsgrid'
        },
        {
            region: 'south',
            height: 250,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    title: 'Inspectors',
                    flex: 1,
                    margin: 2,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'grid',
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
                                            inspection_id = grid.up('gmpschedulingcontainer').down('form').down('hiddenfield[name=id]').getValue();
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
                },
                {
                    title: 'Inspection Types',
                    flex: 1,
                    margin: 2,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'grid',
                            tbar: [
                                {
                                    xtype: 'button',
                                    text: 'Add',
                                    ui: 'soft-green',
                                    iconCls: 'x-fa fa-plus',
                                    handler: 'showAddInspectionOtherDetails',
                                    childXtype: 'gmpinspectiontypesfrm',
                                    winTitle: 'Inspection Types',
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
                                            inspection_id = grid.up('gmpschedulingcontainer').down('form').down('hiddenfield[name=id]').getValue();
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
                                        storeId: 'gmpinspectiontypesstr',
                                        proxy: {
                                            url: 'gmpapplications/getGmpScheduleInspectionTypes'
                                        }
                                    },
                                    isLoad: true
                                }
                            },
                            columns: [
                                {
                                    text: 'Inspection Type',
                                    dataIndex: 'inspection_type_name',
                                    flex: 1
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
                                                table_name: 'gmpschedule_ispection_types',
                                                storeID: 'gmpinspectiontypesstr',
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
        }
    ]
});