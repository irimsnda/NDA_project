/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialAbstractFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'clinicaltrialabstractfrm',
    layout: 'column',
    defaults:{
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top'
    },
    bodyPadding: 5,
    items: [
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'isReadOnly'
                },
                {
                    xtype: 'textfield',
                    name: 'name',
                    columnWidth: 0.9,
                    allowBlank: false,
                    fieldLabel: 'Name'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    columnWidth: 0.1,
                    tooltip: 'Search',
                    action: 'search_btn',
                    childXtype: 'clinicaltrialpersonnelgrid',
                    winTitle: 'Clinical Trial Personnel Selection List',
                    winWidth: '90%',
                    margin: '30 0 0 0'
                }
            ]
        },
        {
            xtype: 'textfield',
            name: 'tin_no',
            allowBlank: false,
            fieldLabel: 'TIN'
        },
        {
            xtype: 'textfield',
            name: 'contact_person',
            allowBlank: false,
            fieldLabel: 'Contact Person'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',
            store: 'countriesstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        regionStore = form.down('combo[name=region_id]').getStore(),
                        filterObj = {country_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    regionStore.removeAll();
                    regionStore.load({params: {filter: filterStr}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'region_id',
            store: 'regionsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        districtStore = form.down('combo[name=district_id]').getStore(),
                        filterObj = {region_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    districtStore.removeAll();
                    districtStore.load({params: {filter: filterStr}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'District',
            name: 'district_id',
            store: 'districtsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            name: 'physical_address'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Postal Address',
            name: 'postal_address'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Telephone No',
            name: 'telephone'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Fax',
            name: 'fax'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email',
            name: 'email'
        }
    ]
});