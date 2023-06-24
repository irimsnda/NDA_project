/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.RetentionChargesPaymentsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'retentionchargespaymentsgrid',
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
    }], features: [
        {
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: 'Applicant Name: {[values.rows[0].data.applicant_name]}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        allowDeselect: true
    },
    columns: [  {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1,
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1,
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        text: 'Certificate No',
        flex: 1,
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'retention_year',
        text: 'Retention Year',
        flex: 1,
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        text: 'Invoice No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'receipt_no',
        text: 'Receipt No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'PayCntrNum',
        text: 'PayCntrNum',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trans_date',
        text: 'Payment Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'amount_paid',
        text: ' Amount',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        text: 'Currency',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'amount_paidths',
        text: ' Amount(Converted)',
        flex: 1
    }]
});
