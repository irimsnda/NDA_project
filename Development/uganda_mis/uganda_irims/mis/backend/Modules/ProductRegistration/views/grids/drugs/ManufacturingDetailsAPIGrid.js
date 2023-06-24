
/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.drugs.ManufacturingDetailsAPIGrid', {
    extend: 'Admin.view.productregistration.views.grids.common_grids.ManufacturingDetailsGrid',
    controller: 'productregistrationvctr',
    xtype: 'manufacturingDetailsAPIGrid',
    itemId: 'manufacturingDetailsAPIGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    is_apimanufacturer: 1,viewModel: {
        type: 'productregistrationvm'
    },
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
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'manufacturingDetailsAPIFrm',
        winTitle: 'Manufacturer details',
        winWidth: '40%',
        handler: 'funcSearchProductManufacturerfrm',
        stores: '[]',
        bind: {
            hidden: '{isReadOnly}'  // negated
        }
    },{
        text: 'Doubleclick to select Manufacturer'
    } ,{
        xtype: 'exportbtn'
    }],
    
});
