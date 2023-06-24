 Ext.define('Admin.view.frontoffice.survelliance.grids.SurvellianceUploadedDocView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   titleCollapse: true,
   width: '100%',
   collapsible: true,
   xtype: 'survellianceuploadeddocview',
   layout: 'fit',
   listeners: {
        beforerender: {
            fn: 'setConfigCombosStore',
            config: {
                pageSize: 1000,
                storeId: 'survellianceuploadeddocviewStr',
                proxy: {
                    url: 'openoffice/getUploadedDocumentPerApplication'
                }
            },
            isLoad: false
        }
    },
    title: 'Survelliance Uploaded Documents',
     viewConfig: {
            emptyText: 'No information found for the product Line under creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'filename',
        name: 'filename',
        text: 'File Name',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'initial_file_name',
        name: 'initial_file_name',
        text: 'Initial File Name',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'upload_by',
        name: 'upload_by',
        text: 'Uploaded By',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'datecolumn',
        dataIndex: 'upload_date',
        name: 'upload_date',
        text: 'Upload Date',
        width: 150,
        format: 'Y-m-d',
        tbCls: 'wrap'
    },{
        xtype: 'datecolumn',
        dataIndex: 'upload_date',
        name: 'upload_date',
        text: 'Upload Date',
        format: 'Y-m-d',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'file_type',
        name: 'file_type',
        text: 'File Type',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'remarks',
        name: 'remarks',
        text: 'Remark',
        width: 150,
        tbCls: 'wrap'
    }]


  });