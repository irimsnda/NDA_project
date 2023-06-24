/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.RetentionChargesInvoicesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'retentionchargesinvoicesgrid',
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
        dataIndex: 'PayCntrNum',
        text: 'PayCntrNum',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'date_of_invoicing',
        text: 'Date Of Invoicing',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_amount',
        text: 'Invoice Amount',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        text: 'Currency',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'retention_status',
        text: 'Retention Status',
        flex: 1,
        renderer: function (value, metaData,record) {
            var retention_status_id = record.get('retention_status_id')
            if (retention_status_id ==2) {
                metaData.tdStyle = 'color:white;background-color:green';
                return value;
            }
            metaData.tdStyle = 'color:white;background-color:red';
            return value;
        }
    }]
});
