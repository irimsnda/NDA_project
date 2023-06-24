/**
 * Created by softclans.
 */
Ext.define('Admin.view.commoninterfaces.views.grids.UploadedApplicationPaymentsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'uploadedapplicationpaymentsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
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
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        // hidden: true,
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    selModel: {
        selType: 'checkboxmodel'
    },
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'applicationpaymentsstr',
                proxy: {
                    url: 'api/getUploadedApplicationPaymentDetails'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
               // grid.down('button[name=remove_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
               // grid.down('button[name=remove_selected]').setDisabled(true);
            }
        }
    }, tbar:[{
            text: 'Add & Upload Payment Details',
            iconCls: 'x-fa fa-plus',
            ui: 'soft-green',
            name: 'addmanualpaymentdetails'
    }],
    columns: [{
        xype: 'rownumberer'
    },{
        xtype: 'datecolumn',
        dataIndex: 'created_on',
        text: 'Uploaded On',
        format: 'd/m/Y',
        flex: 1,
        summaryRenderer: function () {
            return '<b>TOTAL PAID:</b>';
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'payment_mode',
        text: 'Payment Mode',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'amount_paid',
        text: 'Amount',
        flex: 1,
        summaryType: 'sum',
        renderer: function (val) {
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
            return '<b>' + val + '</b>';
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        text: 'Currency',
        flex: 1
    },{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Download Payment Slip',
            iconCls: 'x-fa fa-eye',
            handler: 'previewUploadedDocument',
            download: 0
        }
    }]
});
