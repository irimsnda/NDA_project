/**

 * Created by Softclans on 1/24/2019.
 */
Ext.define('Admin.view.importexportpermits.views.grids.common_grids.OrderSupplyDangerousGoodsPrintingGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ordersupplydangerousgoodsprintinggrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                groupField:'applicant_name',
                storeId: 'importexportpermitreleasegridStr',
                proxy: {
                    url: 'importexportpermits/getImportExportApprovedPermit'
                }
            },
            isLoad: true,
            autoLoad: true
        }
    },
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: false
    }],
    columns: [{
        xtype: 'widgetcolumn',
        width: 120,
        widget: {
            width: 120,
            textAlign: 'left',
            xtype: 'button',
            ui: 'soft-green',
            text: 'Print/Preview Order for Supply of Dangeruous Drugs',
            iconCls: 'x-fa fa-certificate',
            name: 'certificate',
            handler: 'generateColumnOrderforSupplyDangeruousDrg'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Application No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'ordered_by',
        text: 'Ordered By',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'qualifications',
        text: 'Qualifications',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'qualification_license_no',
        text: 'HPCZ or Vaz License No:',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
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
                items: [
                    {
                        text: 'Print/Preview Order for Supply of Dangeruous Drugs',
                        iconCls: 'x-fa fa-certificate',
                        handler: '',
                        name: 'certificate',
                        handler: 'generateOrderforSupplyDangeruousDrg'
                    },
                    {
                        text: 'Preview Order for Supply of Dangeruous Drugs Details',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'editpreviewPermitinformation'
                    }
                ]
            }
        }
    }]
});