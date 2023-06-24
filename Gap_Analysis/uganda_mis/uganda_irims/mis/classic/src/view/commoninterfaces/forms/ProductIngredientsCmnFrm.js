/**
 * Created by Softclans on 3/14/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.ProductIngredientsCmnFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productingredientscmnfrm',
    bodyPadding: 5,
    layout: 'column',
    defaults: {
        columnWidth: 1,
        margin: 5,
        allowBlank: false
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Ingredient',
            store: 'masteringredientsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            name: 'ingredient_id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Specification Type',
            store: 'ingrespecificationtypestr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            name: 'specification_id',
            listeners: {
                beforerender: function () {
                    var store = this.getStore();
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'fieldcontainer',
            fieldLabel: 'Strength',
            layout: 'column',
            items: [
                {
                    xtype: 'textfield',
                    columnWidth: 0.7,
                    name: 'strength'
                },
                {
                    xtype: 'combo',
                    store: 'siunitstr',
                    forceSelection: true,
                    queryMode: 'local',
                    columnWidth: 0.3,
                    valueField: 'id',
                    displayField: 'name',
                    name: 'si_unit_id',
                    listeners: {
                        beforerender: function () {
                            var store = this.getStore();
                            store.removeAll();
                            store.load();
                        }
                    }
                }
            ]
        },
        {
            xtype: 'combo',
            fieldLabel: 'Reason for Inclusion',
            store: 'impproductinclusionreasonstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            name: 'inclusion_reason_id'
        }
    ]
});