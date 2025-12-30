import { Alert, AlertDescription } from "@/components/ui/alert";
import useEditAccount from "../hooks/useEditAccount";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  IconCheck,
  IconEdit,
  IconLock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconShield,
  IconUser,
  IconX,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Account() {
  const {
    user,
    dataFormOnSubmit,
    isLoadingData,
    isEditingData,
    handleDataFormCancel,
    getInitials,
    getRoleBadgeVariant,
    dataForm,
    setIsEditingData,
    passwordForm,
    isEditingPassword,
    setIsEditingPassword,
    handlePasswordFormCancel,
    isLoadingPassword,
    passwordFormOnSubmit,
  } = useEditAccount();
  if (!user) {
    return (
      <div className="container mx-auto py-6">
        <Alert>
          <AlertDescription>Loading user information...</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="px-2 space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold italic tracking-tight">
          Account Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <Separator />

      {/* Profile Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-primary/10">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                  {user.isPhoneVerified && (
                    <Badge variant="outline" className="gap-1">
                      <IconCheck className="h-3 w-3" />
                      Verified
                    </Badge>
                  )}
                </CardDescription>
              </div>
            </div>

            {!isEditingData && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingData(true)}
              >
                <IconEdit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={dataForm.handleSubmit(dataFormOnSubmit)}
            className="space-y-6"
          >
            {/* Editable Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <IconUser className="h-4 w-4" />
                  Full Name
                </Label>
                {isEditingData ? (
                  <div>
                    <Input
                      id="name"
                      {...dataForm.register("name")}
                      placeholder="Enter your name"
                      disabled={isLoadingData}
                    />
                    {dataForm.formState.errors.name && (
                      <p className="text-sm text-destructive mt-1">
                        {dataForm.formState.errors.name.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted rounded-md">
                    {user.name}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <IconPhone className="h-4 w-4" />
                  Phone Number
                </Label>
                {isEditingData ? (
                  <div>
                    <Input
                      id="phone"
                      {...dataForm.register("phone")}
                      placeholder="Enter your phone number"
                      disabled={isLoadingData}
                    />
                    {dataForm.formState.errors.phone && (
                      <p className="text-sm text-destructive mt-1">
                        {dataForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm py-2 px-3 bg-muted rounded-md flex items-center justify-between">
                    {user.phone}
                    {user.isPhoneVerified && (
                      <IconCheck className="h-4 w-4 text-green-600" />
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditingData && (
              <div className="flex gap-3">
                <Button
                  type="submit"
                  disabled={isLoadingData || !dataForm.formState.isDirty}
                  className="bg-primary"
                >
                  <IconCheck className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDataFormCancel}
                  disabled={isLoadingData}
                >
                  <IconX className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}

            <Separator />

            {/* Read-Only Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Account Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <IconMail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <p className="text-sm py-2 px-3 bg-muted rounded-md">
                    {user.email}
                  </p>
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <IconShield className="h-4 w-4" />
                    User Role
                  </Label>
                  <p className="text-sm py-2 px-3 bg-muted rounded-md">
                    {user.role}
                  </p>
                </div>

                {/* Branch */}
                {user.branch && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-muted-foreground">
                      <IconMapPin className="h-4 w-4" />
                      Branch
                    </Label>
                    <p className="text-sm py-2 px-3 bg-muted rounded-md">
                      {user.branch}
                    </p>
                  </div>
                )}

                {/* Account Status */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-muted-foreground">
                    <IconShield className="h-4 w-4" />
                    Account Status
                  </Label>
                  <div className="py-2 px-3 bg-muted rounded-md">
                    <Badge variant={user.isActive ? "default" : "destructive"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconLock className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>
            Manage your password and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="space-y-1">
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">
                Last changed on{" "}
                {new Date(user.passwordChangedAt).toLocaleDateString()}
              </p>
            </div>

            {!isEditingPassword && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditingPassword(true)}
              >
                <IconLock className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            )}
          </div>

          {/* Password Edit Form */}
          {isEditingPassword && (
            <form
              onSubmit={passwordForm.handleSubmit(passwordFormOnSubmit)}
              id="password-form"
              className="space-y-6"
            >
              <div className="border rounded-lg p-4 space-y-4 bg-muted/40">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="flex items-center gap-2">
                    Current Password
                  </Label>
                  <Input
                    id="currentPassword"
                    {...passwordForm.register("currentPassword")}
                    placeholder="Enter current password"
                    disabled={isLoadingData}
                  />
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="text-sm text-destructive mt-1">
                      {passwordForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    New Password
                  </Label>
                  <Input
                    id="password"
                    {...passwordForm.register("password")}
                    placeholder="Enter new password"
                    disabled={isLoadingData}
                  />
                  {passwordForm.formState.errors.password && (
                    <p className="text-sm text-destructive mt-1">
                      {passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordConfirm" className="flex items-center gap-2">
                    Confirm Password
                  </Label>
                  <Input
                    id="passwordConfirm"
                    {...passwordForm.register("passwordConfirm")}
                    placeholder="Enter confirm password"
                    disabled={isLoadingData}
                  />
                  {passwordForm.formState.errors.passwordConfirm && (
                    <p className="text-sm text-destructive mt-1">
                      {passwordForm.formState.errors.passwordConfirm.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    form="password-form"
                    disabled={
                      isLoadingPassword || !passwordForm.formState.isDirty
                    }
                    className="bg-primary"
                  >
                    <IconCheck className="h-4 w-4 mr-2" />
                    Update Password
                  </Button>

                  <Button variant="outline" onClick={handlePasswordFormCancel}>
                    <IconX className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Account Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <div className="flex justify-between">
            <span>Account Created:</span>
            <span className="font-medium text-foreground">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated:</span>
            <span className="font-medium text-foreground">
              {new Date(user.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
