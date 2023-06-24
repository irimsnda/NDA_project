/**
 * Created by Kip on 1/12/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.AssignedGmpInspectionsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'assignedgmpinspectionsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    appDetailsReadOnly: 1,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [
        {
            text: 'Add',
            ui: 'soft-green',
            iconCls: 'x-fa fa-plus',
            handler: 'showAddGmpApplicationsForInspections',
            childXtype: 'gmpappsforinspectiongrid',
            winTitle: 'Gmp Applications',
            winWidth: '70%'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    width: '100%',
                    table_name: 'tra_gmp_applications',
                    beforeLoad: function () {
                        var store = this.store,
                            grid = this.up('grid'),
                            inspection_id = grid.up('gmpschedulingcontainer').down('form').down('hiddenfield[name=id]').getValue();
                        store.getProxy().extraParams = {
                            inspection_id: inspection_id
                        };
                    }
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'assignedgmpinspectionsstr',
                proxy: {
                    url: 'gmpapplications/getAssignedGmpInspections'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Premise Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        hidden: true,
        text: 'Date Received',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gmp_type_txt',
        text: 'GMP Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        text: 'Application Type',
        flex: 1
    }, {
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
                    table_name: 'assigned_gmpinspections',
                    storeID: 'assignedgmpinspectionsstr',
                    action_url: 'gmpapplications/deleteGmpApplicationRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteGmpApplicationWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
