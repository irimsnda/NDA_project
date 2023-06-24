/**
 * Created by Softclans on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.grids.ApplicationSubmissionTermsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'onlineservicesconfVctr',
    xtype: 'applicationsubmissiontermsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
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
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'applicationsubmissiontermsfrm',
        winTitle: 'Submission Terms & Conditions',
        winWidth: '60%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Online Portal Services',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{

        ftype:'grouping'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'applicationsubmissiontermsstr',
                grouper: {
                    groupFn: function (item) {
                        return item.get('module_name');
                    }
                },
                proxy: {
                   url: 'onlineservices/getApplicationTermsConditions'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module Name ',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        text: 'Sub Module Name ',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'order_no',
        text: 'Order No',
        flex: 0.5
    },{
        xtype: 'gridcolumn',
        dataIndex: 'term_conditiondetails',
        text: 'Terms and Conditions',
		tdCls: 'wrap-text',
        flex: 1
    },{
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'is_enabled',
                                                    text: 'Enable',
                                                    flex: 0.4,
                                                    tdCls: 'wrap-text',
                                                    renderer: function (value, metaData) {
                                                        if (value) {
                                                            metaData.tdStyle = 'color:white;background-color:green';
                                                            return "True";
                                                        }

                                                        metaData.tdStyle = 'color:white;background-color:red';
                                                        return "False";
                                                    }
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
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
					childXtype: 'applicationsubmissiontermsfrm',
					winTitle: 'Application Terms & Conditions',
                    winWidth: '60%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }]
            }
        }
    }]
});
