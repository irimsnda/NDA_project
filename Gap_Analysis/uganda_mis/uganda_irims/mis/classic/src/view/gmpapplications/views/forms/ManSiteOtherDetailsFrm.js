/**
 * Created by Kip on 12/18/2018.
 */
Ext.define('Admin.view.gmpapplications.views.forms.ManSiteOtherDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'mansiteotherdetailsfrm',
    controller: 'gmpapplicationsvctr',
    frame: true,
    layout: {
        type: 'form'
    },
    bodyPadding: 5,
    defaults: {
        margin: 5,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_mansite_otherdetails'
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'combo',
            fieldLabel: 'Business Type',
            name: 'business_type_id',
            store: 'businesstypesstr',
            readOnly: true,
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listeners: {
                change: function (cmb, newVal) {
                    var form = cmb.up('form'),
                        detailsStore = form.down('combo[name=business_type_detail_id]').getStore(),
                        filters = {business_type_id: newVal},
                        filter = JSON.stringify(filters);
                    detailsStore.removeAll();
                    detailsStore.load({params: {filter: filter}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Business Type Details',
            name: 'business_type_detail_id',
            store: 'businesstypedetailsstr',
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id'
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_mansite_otherdetails',
            storeID: 'mansiteotherdetailsstr',
            action_url: 'gmpapplications/saveSiteOtherDetails',
            handler: 'doCreateGmpApplicationParamWin'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]

});