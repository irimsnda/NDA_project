/**
 * Created by Softclans on 11/5/2018.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.grids.SafetyAlertReportsObservationsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'pharmacovigilancevctr',
    xtype: 'safetyalertreportsobservationsgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: 500,
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
    tbar: [{
        xtype: 'button',
        text: 'Add New Safety Alert Observation & Recommendation',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_query',
        childXtype:'safetyalertreportsobservationsfrm',
        storeID: 'safetyalertreportsobservationsstr',
        win_title: 'Add New Safet Alert Observation & Recommendation',
        handler: 'showAddApplicationalertObservations',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'hiddenfield',
        name: 'application_code'
    }, {
        xtype: 'hiddenfield',
        name: 'application_id'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Safety Alerts Observations',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.store,
                grid = this.up('grid'),
                application_code = grid.down('hiddenfield[name=application_code]').getValue();
                store.getProxy().extraParams = {
                
                    application_code: application_code
                };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'safetyalertreportsobservationsstr',
                proxy: {
                    url: 'pharmacovigilancereporting/getSafetyalertreportsobservationsDetails'
                }
            },
            isLoad: true
        },
        afterrender: function () {
            var grid = this;

                grid.columns[grid.columns.length - 1].widget.menu.items = [
                    {
                        text: 'Edit Safety Alert Observation',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Safety Alert Observation',
                        action: 'edit',
                        childXtype: 'safetyalertreportsobservationsfrm',
                        winTitle: 'Edit Safety Alert Observation',
                        winWidth: '70%',
                        handler: 'editwAddApplicationalertObservations',
                        stores: '[]',
                        hidden: true
                    },{
                        text: 'Delete Safety Alert Observation',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Delete Safety Alert Observation',
                        action: 'delete',
                        childXtype: 'safetyalertreportsobservationsfrm',
                        winTitle: 'Query',
                        winWidth: '35%',
                        stores: '[]',
                        hidden: true
                    }];
            
        }
    },
    columns: [{
        xtype: 'rownumberer'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'safetyalert_category',
        text: 'Safety Alert Category',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'safety_alert',
        text: 'Safety Alert',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'safety_alert_observation',
        text: 'Safety Alert Observations',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'safetyalert_recommendation',
        text: 'Safety Alert Recommendation',
        width: 100,
        tdCls: 'wrap'
    },  {
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
                items: []
            }
        }
    }]
});
