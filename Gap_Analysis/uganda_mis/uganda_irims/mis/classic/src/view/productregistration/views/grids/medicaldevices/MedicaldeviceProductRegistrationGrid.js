
Ext.define('Admin.view.productregistration.views.grids.medicaldevices.MedicaldeviceProductRegistrationGrid', {
    extend: 'Admin.view.productregistration.views.grids.common_grids.ProductRegistrationGrid',
    controller: 'productregistrationvctr',
    xtype: 'medicaldeviceproductregistrationgrid',
    itemId: 'medicaldeviceproductregistrationgrid',
    store: 'medicaldevicesproductregistrationstr',
    listeners:{
        beforerender:function(grid){
            grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'medicaldevicesproductregistrationstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('medicaldeviceproductregistrationgrid').fireEvent('refresh', this);

        }
    }],
});