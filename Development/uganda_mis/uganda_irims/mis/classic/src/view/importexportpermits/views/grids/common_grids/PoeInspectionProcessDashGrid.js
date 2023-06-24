
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.PoeInspectionProcessDashGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'poeinspectionprocessdashgrid',
    itemId: 'poeinspectionprocessdashgrid',
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
    listeners: {
        afterrender: {
            fn: 'setProductRegGridsStore',
            config: {
                storeId: 'poeinspectionprocessdashgridstr',
                    proxy: {
                        url: 'importexportpermits/getPoeinspectionprocessdetails'
                    }
            },
            isLoad: true
        },
        itemdblclick: 'onViewImportExportPermitApplication'
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
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        inspection_status_id: 1,
        beforeLoad: function () {
            this.up('poeinspectionprocessdashgrid').fireEvent('refresh', this);//
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
       groupHeaderTpl: 'Process: {[values.rows[0].data.process_name]}, [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    columns: [ {
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'permit_no',
        text: 'Permit No',
        flex: 1
    },   {
        xtype: 'gridcolumn',
        text: 'Permit section ',
        dataIndex: 'permit_section',
        flex: 1,
        tdCls: 'wrap'
    },{
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
