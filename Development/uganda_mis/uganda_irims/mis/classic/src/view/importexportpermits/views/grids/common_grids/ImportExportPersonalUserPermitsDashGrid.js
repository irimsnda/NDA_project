
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.ImportExportPersonalUserPermitsDashGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'importexportpermitsvctr',
    xtype: 'importexportpersonaluserpermitsdashgrid',
    itemId: 'importexportpersonaluserpermitsdashgrid',
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
    tbar: [{
      text:'Double Click to Edit Application'  
    },{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    },  {
        xtype: 'tbspacer',
        width: 10
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Controlled Drugs Permits applications',

    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
       groupHeaderTpl: 'Mode of declaration: {[values.rows[0].data.mode_of_declaration]}, [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking Number',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'prescribling_hospital',
        text: 'Prescribling Hospital',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        text: 'Hospital Address',
        dataIndex: 'hospital_address',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        text: 'Proforma Invoice No',
        dataIndex: 'proforma_invoice_no',
        flex: 1,
        tdCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        text: 'Proforma Invoice Date',
        dataIndex: 'proforma_invoice_date',
        flex: 1,
        tdCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        text: 'Inspected on',
        dataIndex: 'inspected_on',
        flex: 1,
        tdCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'inspection_recommendation_id',
        text: 'Inspection Recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        text: 'Date Received',
        dataIndex: 'date_received',
        flex: 1,
        tdCls: 'wrap-text',
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    }],
    listeners: {
       
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'importexportpersonaluserpermitsdashgridstr',
                proxy: {
                    url: 'importexportpermits/getImportExportPersonalUsePermits'//
                }
            },
            isLoad: true,
            autoLoad: true
        },
        itemdblclick: 'onViewPersonalPermitApplication'
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

           // this.up('importexportpersonaluserpermitsdashgrid').fireEvent('refresh', this);

        }
    }]
});
