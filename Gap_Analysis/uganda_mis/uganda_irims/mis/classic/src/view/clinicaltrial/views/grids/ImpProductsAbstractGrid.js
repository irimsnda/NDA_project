/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.ImpProductsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'impproductsabstractgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'category_name',
                text: 'Category',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'brand_name',
                text: 'Brand Name',
                flex: 1,
                tdCls: 'wrap'
            },{
                xtype: 'gridcolumn',
                dataIndex: 'classification_name',
                text: 'Classification Name',
                flex: 1,
                tdCls: 'wrap'
            },  {
                xtype: 'gridcolumn',
                dataIndex: 'registration_no',
                text: 'Reg No',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'identification_mark',
                text: 'Identification Mark',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'market_location',
                text: 'Market Location',
                flex: 1,
                tdCls: 'wrap'
            },  {
                xtype: 'gridcolumn',
                dataIndex: 'manufacturer_name',
                text: 'Manufacturer',
                flex: 1,
                tdCls: 'wrap'
            },{
                xtype: 'gridcolumn',
                dataIndex: 'product_desc',
                text: 'Product Description',
                flex: 1,
                tdCls: 'wrap'
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});