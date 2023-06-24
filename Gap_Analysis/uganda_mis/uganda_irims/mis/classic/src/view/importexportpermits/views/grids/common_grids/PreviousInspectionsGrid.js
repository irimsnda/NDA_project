
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.PreviousInspectionsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'previousinspectionsgrid',
    itemId: 'previousinspectionsgrid',
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
    },bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('previousinspectionsgrid').fireEvent('refresh', this);//
        }
    }],
    listeners: {
        afterrender: {
            fn: 'setProductRegGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'previousinspectionsgridstr',
                groupField:'sub_module',
                    proxy: {
                        url: 'importexportpermits/getPoePreviousPermitsInspection',
                        
                    }
            },
            isLoad: true
        }
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, {
        xtype: 'tbspacer',
        width: 10
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'POE Import/Export Inspections applications',

    columns: [ {
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Permit No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        text: 'Inspection By',
        dataIndex: 'inspection_by',
        flex: 1,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        text: 'Inspected On',
        dataIndex: 'inspected_on',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'port_ofentryexit',
        text: 'Port of Entry/Exit',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'proforma_invoice_no',
        text: 'Proforma Invoice No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'tra_reg_number',
        text: 'TRA Reg NUmber',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_status',
        text: 'Inspection Status',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Date Added',
        dataIndex: 'date_added',
        flex: 1,
        tdCls: 'wrap-text',
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    }]
});
