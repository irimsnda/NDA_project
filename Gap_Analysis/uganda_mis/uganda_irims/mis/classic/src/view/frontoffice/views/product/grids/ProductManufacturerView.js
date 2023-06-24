 Ext.define('Admin.view.frontoffice.product.grids.ProductManufacturerView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   collapsible: true,
   titleCollapse: true,
    xtype: 'productmanufacturerview',
   layout: 'fit',
    store: 'spreadsheetmaninfostr',
    title: 'Product Manufacturer Details',
     viewConfig: {
            emptyText: 'No information found for the product under creteria'
        },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'Manufacturer',
        name: 'Manufacturer',
        text: 'Manufacturer',
        width: 150,
        tbCls: 'wrap'
       
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Site',
        name: 'Site',
        text: 'Site',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Role',
        name: 'Role',
        text: 'Role',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Country',
        name: 'Country',
        text: 'Country',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Region',
        name: 'Region',
        text: 'Region',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        name: 'physical_address',
        text: 'physical address',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        name: 'postal_address',
        text: 'postal address',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        name: 'email_address',
        text: 'email address',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'PhoneNo',
        name: 'PhoneNo',
        text: 'Phone No',
        width: 150,
        tbCls: 'wrap'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'MobileNo',
        name: 'MobileNo',
        text: 'Mobile No',
        width: 150,
        tbCls: 'wrap'
    }
    ]


  });