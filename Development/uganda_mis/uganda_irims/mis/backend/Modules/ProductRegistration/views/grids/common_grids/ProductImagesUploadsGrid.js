/**
 * Created by Softclans
 * User robinson odhiambo
 * on 10/4/2018. 
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductImagesUploadsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'productImagesUploadsGrid',
    upload_tab: 'productImagesUploadsGrid',
    document_type_id: 6,
    table_name: 'tra_product_applications',
    // 
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'productimagesUploadsStr',
                groupField: 'document_type_id',
                proxy: {
                    url: 'documentmanagement/onLoadProductImagesUploads',
                }
            },
            isLoad: true
        }
    },
    tbar:[{
        xtype: 'button',
        text: 'Upload',
        name: 'add_upload',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        winTitle: 'Product Images Upload',
        childXtype: 'productImagesUploadsFrm',
        winWidth: '35%',
        stores: '[]',
         bind: {
            hidden: '{isReadOnly}'  // negated
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: '=> {[values.rows[0].data.document_type]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],

    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'uploaded_image',
        text: 'Product Image',
        width: 150,
        renderer: function (val) {
            if (val) {
                return '<img src="' + val + '" >';
            } 
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'document_type',
        text: 'Document Type',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'file_name',
        text: 'Image Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'initial_file_name',
        text: 'Initial Image Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'uploaded_by',
        text: 'Upload By',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'uploaded_on',
        text: 'Upload Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('Y-m- H:i:s')
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
                    text: 'Preview Original',
                    iconCls: 'x-fa fa-eye',
                    handler: 'previewUploadedProductImage',
                    download: 0
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_uploadedproduct_images',
                    storeID: 'productimagesUploadsStr',
                    action_url: 'productregistration/deleteUploadedProductImages',
                    action: 'actual_delete',
                    handler: 'doDeleteProductOtherdetails',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete'),
                    bind: {
                        hidden: '{isReadOnly}'  // negated
                    }
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
        beforeLoad: function () {
            
            this.up('productImagesUploadsGrid').fireEvent('refresh', this);

        }
    }],
});
