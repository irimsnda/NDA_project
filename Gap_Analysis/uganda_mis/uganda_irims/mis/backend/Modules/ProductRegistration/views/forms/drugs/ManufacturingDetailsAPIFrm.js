
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.ManufacturingDetailsAPIFrm', {
    extend: 'Admin.view.productregistration.views.forms.common_forms.ManufacturingDetailsFrm',
    xtype: 'manufacturingDetailsAPIFrm',
    itemId: 'manufacturingDetailsAPIFrm',
    layout: {
        type: 'column',
        columns: 2
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.5,
        allowBlank: false,
    },
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: ['->', {
                text: 'Save Details',
                iconCls: 'x-fa fa-save',
                action: 'save',
                table_name: 'tra_manufacturers_information',
                storeID: 'manufacturingDetailsStr',
                formBind: true,
                is_apimanufacturer: 1,
                ui: 'soft-purple',
                action_url: 'productregistration/saveManufacturerDetails',
                action: 'btn_savedetails'
            }
        ]
    }]
});