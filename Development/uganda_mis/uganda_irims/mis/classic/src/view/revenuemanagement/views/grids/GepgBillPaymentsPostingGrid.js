/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.GepgBillPaymentsPostingGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'gepgbillpaymentspostinggrid',
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
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    tbar:['->',{
        fieldLabel: 'Payment From',
        xtype:'datefield',
        labelAlign: 'right',
        width: '300',
        name: 'paid_fromdate'
    },{
        fieldLabel: 'Payment From',
        xtype:'datefield',
        labelAlign: 'right',
        width: '300',
        name: 'paid_todate'
    },{
        text: 'Filter Bills',
        iconCls:'-x-fa fa-search',
        margin: 5,ui:'soft-green',
        handler: 'funcFIlterBillsPaymentsDetails'
    },{
        text: 'Filter Bills',
        iconCls:'-x-fa fa-search',
        margin: 5,
        ui:'soft-red',
        handler: 'funcClearPayentFIlterBillsDetails'
    },{
            text:'Print Payment Statement',
            iconCls:'-x-fa fa-print',
            handler: 'funcGeneratePaymentsStatement'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                
                storeId: 'gepgbillinvoicepostinggridstr',
                pageSize: 200, remoteFilter: true,
                totalProperty:'totals',
                groupField:'module_name',
                proxy: {
                    url: 'revenuemanagement/getGepgbillPaymentspostingdetails',
                    reader: {
                        type: 'json',
                        totalProperty: 'totals'
                    },
                }
            },
            isLoad: true
        }, afterrender: function(grid){
            var store = grid.getStore();
                store.removeAll();
                store.load();
        }
    }, features: [
        {
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: 'Module: {[values.rows[0].data.module_name]}, Sub-Module: {[values.rows[0].data.sub_modulename]}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'sub_modulename',
        text: 'Sub-Module Name',
        width:200,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        width:200,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        width:200,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        text: 'Invoice No',
        width:100,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'receipt_no',
        text: 'Receipt No',
         width:100,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
         width:200,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'trans_date',
        text: 'Payment Date',
        width:100,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gepg_submissionstatus',
        text: 'iREMBO Submission Status',
        width:50,
        renderer: function (value, metaData,record) {
            var status_id = record.get('gepgsubmission_status_id')
            if (status_id ==2) {
                metaData.tdStyle = 'color:white;background-color:green';
                return value;
            }
            if(value == ''){
                value = 'Submission Status Not Set';
            }
            metaData.tdStyle = 'color:white;background-color:red';
            return value;
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'iremboInvoiceNumber',
        tdCls:'wrap-text',
        text: 'iREMBO Invoice Number',
        width:100,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'paymentStatus',
        tdCls:'wrap-text',
        text: 'iREMBO Payment Status',
        width:100,
         renderer: function (value, metaData,record) {
            var paymentStatus = record.get('paymentStatus')
            if (paymentStatus == 'PAID') {
                metaData.tdStyle = 'color:white;background-color:green';
                return value;
            }
            metaData.tdStyle = 'color:white;background-color:red';
            return value;
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'PayCtrNum',
        text: 'PayCntrNum',
        width:200,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'payment_ref_no',
        text: 'Payment Reference No',
        width:150,
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'exchange_rate',align:'right',
        style: 'text-align:left',
        text: 'Exchange Rate',
        width:70,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'amount_paid',
        align:'right',
        style: 'text-align:left',
        text: ' Amount Paid',
        width:100,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',align:'right',
        style: 'text-align:left',
        text: 'Currency Name',
        width:50,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'amount_paidtshs',align:'right',
        style: 'text-align:left',
        text: 'Amount Paid(Converted)',
        width:100,
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
                    text: 'Print Payments',
                    iconCls: 'x-fa fa-print',
                    handler: 'funcPrintApplicationREceipts'
                }]
            }
        }
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            this.up('grid').fireEvent('refresh', this);
        }
    }]
});
