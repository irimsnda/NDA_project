 Ext.define('Admin.view.frontoffice.product.grids.ProductPackagingView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   collapsible: true,
   titleCollapse: true,
   width: '100%',
    xtype: 'productpackagingview',
   layout: 'fit',
    store: 'spreadsheetproductpackagingstr',
    title: 'Product Packaging Details',
      viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'Type',
        name: 'Type',
        text: 'Type'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Container',
        name: 'Container',
        text: 'Container',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ContainerMaterial',
        name: 'ContainerMaterial',
        text: 'ContainerMaterial',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ClosureMaterial',
        name: 'ClosureMaterial',
        text: 'ClosureMaterial',
        width: 150,
        tbCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'SealType',
        name: 'SealType',
        text: 'SealType',
        width: 150,
        tbCls: 'wrap'
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'PackagingUnits',
        name: 'PackagingUnits',
        text: 'PackagingUnits',
        width: 150,
        tbCls: 'wrap'
    }
    ]


  });