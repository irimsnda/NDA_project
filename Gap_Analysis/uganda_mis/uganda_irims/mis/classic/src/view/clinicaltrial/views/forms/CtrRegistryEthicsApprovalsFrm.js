/**
 * Created by Kip on 1/19/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.CtrRegistryEthicsApprovalsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'ctrregistryethicsapprovalsfrm',
    controller: 'clinicaltrialvctr',
    layout: 'column',
    frame: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.5,
        labelAlign: 'top',
        margin: 3
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'application_id'
        }, {
            xtype: 'hiddenfield',
            name: 'id'
        },{
            fieldLabel:'Date the study will be submitted for approval ',
            name:'submission_date',
            xtype:'datefield',
            submitFormat: 'Y-m-d',
            format: 'Y-m-d',
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'

        },{
            fieldLabel:'Date of Approval ',
            name:'approval_date',
            xtype:'datefield',submitFormat: 'Y-m-d',
            format: 'Y-m-d',
            allowBlank: true,
            altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'

        },{
            xtype: 'textfield',
            fieldLabel: 'Name of the Committee',
            name: 'committee_name',
        }, {
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            name: 'physical_address'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Phone Number',
            name: 'phone_no'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            name: 'email_address'
        }, {
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
            displayField: 'name'
            
        },{
            xtype:'textfield',
            name:'postal_address',
            fieldLabel:'Postal Address' 
        }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            handler: 'doCreateClinicalTrialParamWin',
            action_url: 'clinicaltrial/onSaveethicsApproval',
            table_name: 'tra_clinicaltrial_ethic_approvals',
            storeID: 'onlineclinicaltrialethicsappgridstr',
        }
    ]
});